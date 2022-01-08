---
layout: single
title: HTB-Active
excerpt: "WriteUp con metodología de la máquina Active."
date: 2021-12-09
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Active.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Active.png'></center>

IP -> 10.10.10.100


# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.

[Active Nmap Result](/assets/files/WriteUps/Active.txt)

> Winrm no está abierto

## Crackmapexec
Usamos [Crackmapexec](/Crackmapexec/) para enumerar información del [Active Directory](/Active-Directory/) y añadimos el dominio al /etc/hosts
> OS: Windows 6.1 x64
> Dominio: active.htb
> Signing: True
> SMBv1: False

## smbclient y smbhost
Listamos servicios mediante un [null session](/SMB/
> Podemos listar el directorio **Replication**

## ldap
Enumeramos el servicio [ldap](/ldap/) con [ldapsearch]((/ldap/)
No encontramos nada

## rpc
Aporvechamos el servicio [rpc](/rpc/) para enumerar usuarios del sistema. Pero nos da error, necesitamos credenciales.

## smbmap
Con [smbmap](/SMB/) listamos de forma recursiva los recursos dentro de **Replication**.
> active.htb

Seguimos enumerando en directorios (active.htb).
> DfrsPrivate
> Policies
> scripts

Tiene estructura similar a un sysvol, vamos a centrarnos en encontrar un archivo **groups.xml**.

> Policies/{.\*?}/MACHINE/Preferences/Groups/groups.xml


# Explotación

## gpp-decrypt
Con [gpp-decrypt](/gpp-decrypt/) obtenemos un usuario y contraseña del archivo groups.xml
> User: svc_tgs
> Pass: GPPstillStandingStrong2k18

## Crackmapexec y kerbrute
Validamos las credenciales con [Crackmapexec](/Crackmapexec/) y [kerbrute](/Kerberos/). Son válidas pero no tenemos PWNED y el winrm esta cerrado.

## GetUserSPN.py
Probamos un [Kerberoasting](/Kerberoasting/) Attack con la credenciales obtenidas.
> El usuario Administrator es Kerberoasteable.

## john
Tratamos de romper el hash TGS con el rockyou. Obtenemos credenciales válidas para el usuario Administrator

> User: Administrator
> Pass: Ticketmaster1968

## Crackmapexec
Validamos las credenciales con [Crackmapexec](/Crackmapexec/) y obtenemos PWNED por smb.

## psexec.py
Nos conectamos por [psexec.py](/SMB/) al usuario Administrator.


> user.txt
> root.txt


---

Escrito el 09-12-2021 a las 05:39 am por creep33.
