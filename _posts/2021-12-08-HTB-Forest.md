---
layout: single
title: HTB-Forest
excerpt: "WriteUp con metodología de la máquina Forest."
date: 2021-12-08
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Forest.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Forest.png'></center>

IP -> 10.10.10.161

# Reconocimiento 
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.
[Forest Nmap Result](/assets/files/WriteUps/Forest.txt)

## Crackmapexec
Usamos [Crackmapexec](/Crackmapexec/) para enumerar información del [Active Directory](/Active-Directory/) y añadimos el dominio al /etc/hosts
> OS: Windows Server 2016
> Dominio: htb.local
> Signing: True
> SMBv1: True

Añadimos el dominio al /etc/hosts


## smbclient y smbhost
Listamos servicios mediante un [null session](/SMB/) tanto con [smbclient](/SMB/) como con [smbmap](/SMB/).
> No encontramos nada

## rpc
Aporvechamos el servicio [rpc](/rpc/) para enumerar usuarios del sistema.

## kerbrute
Verificamos los usuarios que hemos obtenido en [Kerberos](/Kerberos/)
Algunos usuarios no son válidos, los quitamos.

> Archivo users

## GetNPUsers.py
Probamos un [ASREPRoast](/ASREPRoast/) con la herramienta [GetNPUsers.py]((/ASREPRoast/)

> Obtenemos un ticket del usuario: **svc-alfresco**

## John
Tratamos de romper el hash con John y el rockyou.

> Obtenemos la contraseña en texto claro
> User: svc-alfresco 
> Pass: s3rvice

## Crackmapexec
Validamos las contraseñas con [Crackmapexec](/Crackmapexec/).

## GetUserSPN.py
Probamos un [Kerberoasting](/Kerberoasting/) Attack con la credenciales obtenidas pero no obtenemos ninguna entrada.

## ldapdomaindump
Utilizamos la herramienta [ldapdomaindump]((/ldap/)

## Crackmapexec
Probamos las credenciales por winrm. Tenemos acceso a la maquina por [[winrm](/winrm/)

# Explotación
## Evil-winrm
Nos conectamos con la herramienta [evil-winrm]((/winrm/)

> user.txt

# Privilege escalation

Recopilamos información con [SharpHound.ps1](/Bloodhound/) y la interpretamos con [Bloodhound](/Bloodhound/).

> Shortest path to Domain Admin

Enumeramos la información de nuestro usuario.

```powershell
whoami /all
net user svc-alfresco
```

En base a la información de [Bloodhound](/Bloodhound/), de [ldap](/ldap/) y en [winrm](/winrm/). Vemos que pertenecemos al grupo **acount operations**.

Buscamos por internet y vemos que tenemos privilegios para crear usuarios (entre otros)

# Explotación
Añadimos un usuario al [Active Directory](/Active-Directory/)

```powershell
net user creep	Mario123$! /add /domain
```

Nos añadimos al grupo **Exange Windows Permissions**

```powershell
net group "Exange Windows Permissions" creep /add
net user creep
```

Ya tenemos un usuario en el grupo **Exange Windows Permissions**

> User: creep
> Pass: Mario123$!
> Group: Exange Windows Permissions

Miramos en [Bloodhound](/Bloodhound/) qué podemos hacer. Podemos realizar un ataque DCSync con este usuario.

Primero tenemos que otorgar el privilegio para hacer DCSync con [secretsdump.py](/secretsdump.py/).

Utilizamos la herramienta [PowerView.ps1](https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1)

Subimos la herramienta, la importamos y seguimos los pasos de [Bloodhound](/Bloodhound/)

```powershell
Import-Module .\PowerView.ps1
$SecPassword = ConvertTo-SecureString 'Mario123$!' -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential('htb.local\creep', $SecPassword)
Add-DomainObjectAcl -Credential $Cred -TargetIdentity "DC=htb,DC=local" -PrincipalIdentity creep -Rights DCSync
```

Ahora con [secretsdump.py](/secretsdump.py/) dumpeamos el NTDS.dit

Con el hash del administrador, nos conectamos con [winrm](/winrm/)

> root.txt



---

Escrito el 08-12-2021 a las 02:46 pm por creep33.
