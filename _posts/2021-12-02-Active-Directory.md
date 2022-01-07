---
layout: single
title: Active Directory
excerpt: "Definición de Active Directory y posibles vectores de ataque."
date: 2021-12-02
classes: wide
header:
  teaser: /assets/images/Concepts/Active_Directory/active_directory.jpg
  teaser_home_page: true
  icon: /assets/images/concept.png
categories:
  - Concepts
tags:
  - Active Directory
  - Windows
---

# Definición
Un **Active Directory** o directorio activo, es un conjunto de usuarios controlados por un **domain controller**, que actuan como WORKSTATIONS relaccionadas entre sí. Es común en entornos empresariales.

# Vectores de ataque

| Vector | Herramienta |
| --------- | ------------ |
| [[ASREPRoast]] | [GetNPUsers.py](ASREPRoast.md#GetNPUsers.py), [[getTGT.py]] |
| [[Kerberoasting]] | [GetUserSPNs.py](Kerberoasting.md#GetUserSPN.py) |
| Golden Ticket | GoldenPac.py |
| [[Silver Ticket]] | [getST.py](Silver%20Ticket.md#getST.py) | 
| [[ldap]] | [ldapsearch](ldap.md#ldapsearch), [ldapdomaindump](ldap.md#ldapdomaindump), go-windapsearch, gMSADumper|
| [[SMB]] | [[crackmapexec]], [smbmap](SMB.md#smbmap), [smbclient](SMB.md#smbclient), [psexec.py](SMB.md#psexec.py) |
| [[winrm]] | [[crackmapexec]], [evil-winrm](winrm.md#Evil-winrm) |
| [[rpc]] | [rpcclient](rpc.md#rpcclient), [rpcenum](rpc.md#rpcenum) |
| [[Kerberos]] | [kerbrute](Kerberos.md#kerbrute), [pyKerbrute](Kerberos.md#pyKerbrute) |  
| [[Bloodhound]] | [SharpHound.ps1](Bloodhound.md#Sharphound.ps1), [bloodhound-python](Bloodhound.md#bloodhound-python)  |
| [groups.xml](gpp-decrypt.md) | [[gpp-decrypt]]
| [[Almacenamiento de credenciales]] | [[secretsdump.py]], [[reg.py]] |

## Sincronizar hora para prevenir errores.
> Para realizar alguno de estos ataques tenemos que sincronizar la hora con la del DC.
```bash
sudo apt install chrony
sudo timedatectl set-ntp true
sudo ntpdate <machine ip>
```

# Maquinas de HTB con AD
- [x] Intelligence
- [x] Resolute
- [x] Forest
- [x] Active
- [x] Fuse
- [x] Sauna
- [x] APT
- [x] Reel2
- [x] Reel



---

Escrito el 02-12-2021 a las 10:20 am por creep33.
