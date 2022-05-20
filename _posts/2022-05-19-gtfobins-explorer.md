---
layout: single
title: GTFOBins Explorer
excerpt: "Terminal explorer tool to search on GTFOBins website, this website is focused on binary exploitation mostly in privilege escalation."
date: 2022-05-19
classes: wide
header:
  teaser: /assets/images/Tools/gtfobins/icon.jpg
  teaser_home_page: true
  icon: /assets/images/tool.png
categories:
  - Tools
tags:
  - CLI
  - GTFOBins
  - GTFOBins Explorer

---

Terminal explorer tool to search on [GTFOBins website](https://gtfobins.github.io/), this website is focused on binary exploitation mostly in privilege escalation. Insted of needing to open out browser, google for "gtfobins" and searching our binary, we just need to type out binary in out terminal.

# Installation

The Arch Linux version (GTFOBins-Explorer-ng file) depends on **mdcat**, wich is automaticaly installed with paru, if you want to use this version, search how to install **mdcat** in your distro. If not you can just use the normal version and follow the steps described below.

## Arch Linux
I have uploaded it to the AUR repo so you just need to:

```bash
paru -S gtfobins-explorer-git
```
It will create an executable in /usr/bin/gtfobins

## Other Distros
It is important to install html2text with pip2/python2.

```bash
git clone https://github.com/creep33/GTFOBins-Explorer.git
cd GTFOBins-Explorer
sudo python2 -m pip install html2text
sudo mv GTFOBins-Explorer /usr/bin/gtfobins
```

# Usage
## Single binary search

```bash
gtfobins <binary>
```
It will display the multiple options for the binary specified (If there are).

```bash
gtfobins <binary> "<option>"
```

It will display the exact text as if you have searched it in the official GTFOBins website.

### Example (arch/ng version)

For the example we will use **awk** binary.

<div style="text-align:center"><img src="/assets/images/Tools/gtfobins/gtfobins-explorer-nooption.png" /></div>
<br>

For some reason we are not focusing on why, we will display the "File Read" option.

<div style="text-align:center"><img src="/assets/images/Tools/gtfobins/gtfobins-explorer-yesoption.png" /></div>
<br>

And now if we compare it with the official page we will see it is the same.

<div style="text-align:center"><img src="/assets/images/Tools/gtfobins/gtfobins-explorer-officialpage.png" /></div>

## Multiple search

We can input a file which must be the output of the `find / \-perm -4000 2>/dev/null`

```bash
gtfobins -f file
```
Or if you don't want to create the file you can just:

```bash
find / \-perm -4000 2>/dev/null | gtfobins -f -
```

And it will search all the binaries in GTFOBins Website.
