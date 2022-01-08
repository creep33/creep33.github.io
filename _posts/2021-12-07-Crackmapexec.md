---
layout: single
title: Crackmapexec
excerpt: "herramienta para enumerar Active Directory, principalmente los servicios smb y winrm."
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
**Crackmapexec** es una herramienta para enumerar [Active Directory](/Active-Directory/), principalmente los servicios smb y winrm.

# Uso 
Esta herraminta tine distintos modos de uso.

## Para enumerar información del AD.
```bash
crackmapexec smb 10.10.10.10
```

Aqui obtenemos el nombre del dominio, lo añadiremos en /etc/hosts para poder realizar futuros posibles ataques.
Tambien obtenemos información como si está firmado o si utiliza SMBv1 y el sistema operativo.


## Para comprobar usuarios válidos del AD.
```bash
crackmapexec smb -u <user>/<userfile> -p <pass>/<passfile>
```
En caso de que el usuario aparezca como "pwned" tendremos la capacidad de conectarnos mediante psexec.py.

## Para validar si un usuario tiene disponible winrm
Para esto el usuario deberá pertenecer al groupo **Remote Management Users**.

```bash
crackmapexec winrm -u <user>/<userfile> -p <pass>/<passfile>
```

Si aparece "pwned" podremos conectarnos mediante winrm.

## Stop-on-success
Esta herramienta por defecto para si encuentra un match válido, para que continue probando tenemos que añadir la flag ```--continue-on-success```

# Post-pwned
## Dumpear información
Con crackmapexec podemos dumpear la SAM, LSA o NTDS. Ver diferentes tipos de [Almacenamiento de credenciales](/Almacenamiento-de-credenciales/).
### Workstation (sam)
#### Sin privilegios

```bash
crackmapexec smb -u <user> -p <pass> --local-auth
```

#### Con privilegios

```bash
crackmapexec smb -u <adminuser> -p <adminpass> --sam
```

### LSA

```bash
crackmapexec smb -u <adminuser> -p <adminpass> --lsa
```

### Domain controller (ntds)

Y en caso de ser un [domain controler](/Active-Directory/) podremos dumpear todo el ntds.

```bash
crackmapexec smb -u <adminuser> -p <adminpass> --ntds
crackmapexec smb -u <adminuser> -p <adminpass> --ntds vss
```

vss -> Uses the Volume Shadow copy Service

## Ejecutar comandos en usuarios "pwned"
Si tenemos credenciales válidas para usuarios "pwned",
podemos hacer que todos ejecuten un cierto comando.

```bash
crackmapexec smb -u <adminuser> -p <adminpass> -x <cmd>
```


---

Escrito el 07-12-2021 a las 06:04 pm por creep33.
