---
layout: single
title: BloodHound
excerpt: "Herramienta para listar información de un Active Directory y interpretarla para posibles User Pivotings o Privilege Escalation."
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
  - Active Directory

---


# Definición
Bloodhound es una herramienta que nos permite listar información de un [Active Directory](/Active-Directory/), la cual se aprovecha de una base de datos neo4j que tenemos que estar corriendo en nuestro equipo. Y tenemos que proporcionarle datos obtenidos con diferentes utilidades que se explicarán más adelante.

BloodHound utiliza la teoría de los gráficos para revelar las relaciones ocultas y a menudo no intencionadas dentro de un entorno de [Active Directory](/Active-Directory/). Los atacantes pueden utilizar BloodHound para identificar fácilmente rutas de ataque muy complejas que, de otro modo, serían imposibles de identificar rápidamente. Los defensores pueden utilizar BloodHound para identificar y eliminar esas mismas rutas de ataque. Tanto los equipos azules como los rojos pueden utilizar BloodHound para obtener fácilmente una comprensión más profunda de las relaciones de privilegio en un entorno de [Active Directory](/Active-Directory/).

La herramienta se encuentra en [github](https://github.com/BloodHoundAD/BloodHound).

# Uso
## Inicialización
```bash
neo4j console
```
```bash
bloodhound &>/dev/null &
disown
```

Iniciamos sesión con las credenciales de neo4j.

## Recolección de información
### SharpHound.ps1
Este script en powershell nos permite recopilar infomación en local.
Podemos encontrar el script en [github](https://github.com/BloodHoundAD/BloodHound/blob/master/Collectors/SharpHound.ps1).

Tenemos que subir la herramienta a la maquina victima, importarla y ejecutarla.
#### Importación
```powershell
Import-Module .\Sharphound.ps1
```
#### Modos de uso
```powershell
Invoke-Bloodhound -LoopInterval 00:01:00 -LoopDuration 00:10:00
Invoke-Bloodhound -CollectionMethod All
Invoke-Bloodhound -CollectionMethod DCOnly --NoSaveCache --RandomFilenames --EncryptZip
```

Esta, crea un comprimido que tendremos que pasar a la maquina de atacante para importarlo en bloodhound.

### bloodhound-python

```bash
bloodhound-python -u 'user' -p 'userpass' -ns 10.10.10.10 -d dominio.local -c All
```

El parámetro ```-c``` indica el **COLECTIONMETHOD**, funcionan tanto para esta herrmienta como para SharpHound.ps1. Estos son los disponibles: 
```Group, LocalAdmin, Session, Trust, Default (all previous), DCOnly (no computer connections), DCOM, RDP, PSRemote, LoggedOn, ObjectProps, ACL, All (All except LoggedOn)```
Puedes especificar más de uno separándolo con comas.

## Interpretación

Le damos a **upload data** y seleccionamos los archivos/archivo.

En **Analysis** podemos ejecutar distintas utilidades de enumeración.

Si tenemos algun usuario comprometido podemos marcarlo como **pwned**

---

Escrito el 08-12-2021 a las 02:20 pm por creep33.
