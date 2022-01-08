---
layout: single
title: smbserver.py
excerpt: "Herramienta para crear un servicio por smb en Linux."
date: 2021-12-15
classes: wide
header:
  teaser: /assets/images/Tools/bash-icon.png
  teaser_home_page: true
  icon: /assets/images/tool.png
categories:
  - Tools
tags:
  - CLI
  - Linux

---


# Definición
Herramienta para crear un servicio por smb.

## Uso

### Sin contraseña
```bash
smbserver.py smbFolder $(pwd) -smb2support
```

### Con contraseña
```bash
smbserver.py smbFolder $(pwd) -smb2support -username 'user' -password 'userpass'
```
---

Escrito el 07-12-2021 a las 07:50 pm por creep33.
