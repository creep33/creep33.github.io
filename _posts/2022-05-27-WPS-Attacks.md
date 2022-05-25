---
layout: single
title: WPS Attacks
excerpt: "In this post we will see how to attack an WPS via manual tools, without using wifite or similar tools, this automated tools are realy good but sometimes they report false negatives, and there is no better way to check if something is vulnerable rather than testing it manually."
date: 2022-05-27
classes: wide
header:
  teaser: /assets/images/Wireless/wps-icon.png
  teaser_home_page: true
  icon: /assets/images/wireless.png
categories:
  - Wifi
tags:
  - CLI
  - wash
  - reaver
  - bully
  - Wifi Hacking
  - WPS

---

# Context 
Some WPS implementations are flawed, and a successful attack on an AP with WPS leads to disclosure of the passphrase, no matter how complex it is.

These attacks only work on some APs that advertise WPS in the beacons. APs that do _not_ advertise WPS aren't vulnerable to any of these attacks. 

In this post we will see how to attack an WPS via manual tools, without using wifite or similar tools, this automated tools are realy good but sometimes they report false negatives, and there is no better way to check if something is vulnerable rather than testing it manually.

# Technology
## Two roles
The most common scenario is the AP to be the _registrar_ and the client to be the enrolle but this is not always the case.
- **Enrolee**: device looking to join the network
- **Registrar**: configures enrollees to join the network

## Methods For Setup
- Pushing a button
- Inputting a PIN on a device
- Using NFC
- Using a USB flash drive

The last two are deprecated and uncommon.

### Pushing a button
When WPS setup happens with a button push, it can either be a physical button on the AP or a virtual button in a management web interface.

### PIN code
When setting up with a PIN code, two scenarios are possible. 

**In the first scenario**, the PIN is on the AP, either on a sticker or available through the web interface, and the pin has to be entered by the client wanting to join the network. This might sound confusing, but in this case the AP is the enrollee, and the client device is an external registrar.

**In the second scenario**, the PIN is on the client device, and has to be entered in the AP interface, when available. In this case, the client is the enrollee, and the AP is the registrar.

## After setup
The WPS process securely transmits the WPA or WPA2 passphrase over wireless using EAP messages. The client first starts probing the AP. This is followed by authentication and association, where WPS is indicated in one of the IE of the association frame.

It begins with an _EAP Start_ message. An _EAP request identity_ from the other party follows. That is answered with an _EAP response identity_ with _WFA-SimpleConfig-Enrollee-1-0_ indicating the device wants to do a WPS exchange. The AP then sends a _WSC start_ to indicate we're going to start the process.

These are followed by eight _EAP request/response_ messages back and forth, named _M1_ to _M8_. These messages are used to securely exchange the encryption key, and if a PIN is involved, verify it is correct. Afterward, it usually sends a _WSC_DONE_ message, and an _EAP failure_ message.

The device disconnects using disassociation or deauthentication, then reconnects normally using the credentials it just received.

# WPS Vulnerabilities

## Bruteforce (reaver /  bully)
The main WPS vulnerability exploits the external registrar scenario, where the AP has a WPS PIN.

WPS PINs are typically eight digits long. The last digit is a checksum, which leaves ten million possible PINs. Checking a PIN usually takes between one and three seconds. Brute forcing would take three to four months at best, making it almost pointless; however, we can alter our brute force attack and make it a little more efficient because of how the PIN is verified.

PIN verification is done in two parts. The WPS exchange validates the first half of the PIN, which, if brute forced, would account for only ten thousand possibilities at most. Once the first half is valid, the system verifies the second half. Since the last digit is a checksum, there are only three digits left to verify, and the second half is now one thousand possibilities at most.

The first half of the PIN is verified using messages M1 to M4. If we receive M5, it is correct. If the second half is correct, we receive M7, along with the configuration.

## PixieWPS (reaver fork)
The PixieWPS attack, disclosed in 2014, takes advantage of the weak random number generator used in a few chipsets, which means not all WPS implementations are vulnerable. As opposed to the brute force technique, this technique requires minimal interaction with the AP to gather the data needed for the attack, which is then brute forced offline. The current version of reaver, which has been forked from the original and subsequently improved on, integrates the PixieWPS attack.****

## Phisical Attack (ninja skills)
Finally, note that many APs have a sticker on the bottom that may include valuable information like MAC addresses, serial numbers, and, in some cases, a default WPS PIN or even the passphrase. Because administrators leave the default settings in place, sometimes all it takes to find the passphrase is to physically pick up the AP and turn it over.


# WPS Attack
## Monitor mode 
As always we will need to set our wifi interface into **monitor** mode.
```bash
airmon-ng check kill
airmon-ng start wlan0
```

## Check WPS
To check if it is WPS on the target AP we will use a tool called **wash** with the "-i" parameter
```bash
wash -i wlan0mon
```

<br>
<div style="text-align:center"><img style="width: 75%" src="/assets/images/Wireless/washScan.png" /></div>
<br>

Each row represents an AP with WPS. The first column is the BSSID, and the second one is the channel, followed by the signal level reported by the card. The _WPS_ column represents the WPS version. Version 2 mandated mitigations to prevent brute forcing, which, depending on the implementation, may just slow down a bruteforce attack. The _Lck_ indicates if WPS is locked, meaning an attack is pointless at this time. The _Vendor_ column indicates the wireless chipset vendor, which is sometimes advertised in the beacon. The last column is the ESSID of the AP.

Wash scans the 2.4GHz band by default. To make it scan 5GHz, we can append the "-5" option to the command. Alternatively, we can use airodump-ng to display WPS information using "--wps".

## Reaver bruteforce attack
We will now use reaver to attack our _wifi_ AP. We have to specify the BSSID of the AP we gathered earlier using wash with -b, the wireless interface using -i, and a very verbose output with -vv.

```bash
reaver -b A0:0B:BA:F0:9F:B2 -i wlan0mon -vv
```

<br>
<div style="text-align:center"><img style="width: 75%" src="/assets/images/Wireless/reaverAttackStart.png" /></div>
<br>

<div style="text-align:center"><img style="width: 75%" src="/assets/images/Wireless/reaverAttackEnd.png" /></div>
<br>


Note that some drivers have trouble with reaver and won't switch channels to find the AP. This is the case when the output of reaver is stuck at "Waiting for beacon from XX:XX:XX:XX:XX:XX" for a long time. In this case, we have to add the channel parameter (-c) followed by the channel gathered by wash.

## Reaver PixieWPS attack
The method described here will take a long time, and even longer in the event the AP has countermeasures. Earlier, we described the PixieWPS attack. When successful, it will give us results much more quickly. To try it, we will add an additional option to the reaver command, and use -K.

```bash
reaver -b A0:0B:BA:F0:9F:B2 -i wlan0mon -vv -K
```

<br>
<div style="text-align:center"><img style="width: 75%" src="/assets/images/Wireless/PixieWPSStart.png" /></div>
<br>

<div style="text-align:center"><img style="width: 75%" src="/assets/images/Wireless/PixieWPSEnd.png" /></div>
<br>

One alternative to this method is to use bully with -d, which will attempt to run PixieWPS with the values we recovered from bully. We would also need to specify verbosity to display these values, with -v 4. The output can be a bit confusing, but the data for PixieWPS starts with the display of the _Enonce_ and ends with the output of _E-Hash2_.

PixieWPS should work when provided with only the required parameters. Sometimes we also need to provide the -m option as well. Once the PIN is recovered, we can provide it to bully to do a single PIN try, using -B -p followed by the PIN, to recover the passphrase.


# Variations
WPS implementation vary from a vendor to another, which is why reaver and bully have so many options. A few APs, however, do not have a PIN (it is left blank). Both reaver and bully can verify a single pin, and in order to use an empty PIN, we will use -p ''.

Some other implementations have default PIN values that depend on the first three bytes of the BSSID. One project, airgeddon, has compiled a list of these in the file known_pins.db.

As a quick example, let's use this file to check if our particular AP has default pins. We can install the airgeddon package with apt.

We'll use source to execute a shell script, known_pins.db, which loads an array of PINs into memory. Finally, we'll check the database for an AP whose BSSID starts with "0013F7". It is case sensitive and the first three bytes must be uppercase.

```bash
sudo apt install airgeddon
source /usr/share/airgeddon/known_pins.db
echo ${PINDB["0013F7"]}
#Output: 14755989 48703970 06017637
```

The command returns three PINs in this example, which are shown separated by a space character. If there was no match, the output would have been empty. We can manually test each one of these PINs with reaver or bully.

# Troubleshooting
## Attack Choice
The PixieWPS attack is preferable to brute forcing whenever possible, but it's important to remember that not all chipset random number generators are vulnerable. We will often have to resort to brute force the PIN.

Brute forcing may sometimes be met with countermeasures from the AP. Since implementations vary, we can sometimes work around the countermeasures using the timing options in reaver.

## WPS Transaction Failure

Sometimes, after finding the PIN with PixieWPS, we receive the following from reaver.

```bash
[!] WPS transaction failed (code: 0x03), re-trying last pin
```

It could be just a temporary failure, in which case we would need to restart reaver without the PixieWPS option. When we restart, reaver will prompt to restore previous session, which has the correct PIN. If we continue to receive this error, we will need to try another wireless card.

## ACK Issues

Reaver seems to have issues with certain chipsets that do not behave the way it expects. For example, reaver might keep trying the same PIN when verbose mode (using -vv) is set. When increasing verbosity with -vv, we might notice a dozen instances of the following pair of messages.

```bash
[+] Sending identity response
[+] Received identity request
```

This is caused by the wireless card not acknowledging frames sent by the AP, which makes the AP re-transmit them a few times before giving up and trying again.

We might also recognize this in a packet capture when reaver does the authentication and association.

The easiest solution to this is to try a different wireless card with a different chipset.

## WPS Lock

When WPS is locked, we can do a denial of service on the access point using _mdk3_ or its successor, _mdk4_. In some cases, this will trigger a reboot of the AP, which releases the lock.

We can use authentication DoS, EAPOL Start DoS, or the EAPOL Logoff flood attack. We may need multiple wireless cards to carry out the attack, overflow the AP, and make it crash so that it reboots.