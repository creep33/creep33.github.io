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
| [ASREPRoast](/ASREPRoast/) | [GetNPUsers.py](/ASREPRoast/), [getTGT.py](/getTGT.py/) |
| [Kerberoasting](/Kerberoasting/) | [GetUserSPNs.py](/Kerberoasting/) |
| Golden Ticket | GoldenPac.py |
| [Silver Ticket](/Silver-Ticket/) | [getST.py](/Silver-Ticket/) | 
| [ldap](/ldap/) | [ldapsearch](/ldap/), [ldapdomaindump](/ldap/), go-windapsearch, gMSADumper|
| [SMB](/SMB/) | [crackmapexec](/Crackmapexec/), [smbmap](/SMB/), [smbclient](/SMB/), [psexec.py](/SMB/) |
| [winrm](/winrm/) | [crackmapexec](/Crackmapexec/), [evil-winrm](/winrm/) |
| [rpc](/rpc/) | [rpcclient](/rpc/), [rpcenum](/rpc/) |
| [Kerberos](/Kerberos/) | [kerbrute](/Kerberos/), [pyKerbrute](/Kerberos/) |  
| [Bloodhound](/Bloodhound/) | [SharpHound.ps1](/Bloodhound/), [bloodhound-python](/Bloodhound/)  |
| [groups.xml](/gpp-decrypt/) | [gpp-decrypt](/gpp-decrypt/)
| [Almacenamiento de credenciales](/Almacenamiento-de-credenciales/) | [secretsdump.py](/secretsdump.py/), [reg.py](/reg.py/) |

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
