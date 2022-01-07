---
layout: single
title: Kerberoasting
excerpt: "El objetivo de Kerberoasting es recolectar tickets TGS para servicios que se ejecutan en nombrede cuentas de usuario en el Active Directory, no de cuentas de ordenador. Así, parte de estos tickets TGS están cifrados con claves derivadas de las contraseñas de los usuarios. Como consecuencia, sus credenciales podrían ser descifradas fuera de línea."
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
El objetivo de Kerberoasting es recolectar tickets TGS para servicios que se ejecutan en nombre de cuentas de usuario en el [Active Directory](/Active-Directory/), no de cuentas de ordenador. Así, parte de estos tickets TGS están cifrados con claves derivadas de las contraseñas de los usuarios. Como consecuencia, sus credenciales podrían ser descifradas fuera de línea.
Se puede saber que una cuenta de usuario está siendo utilizada como servicio porque la propiedad "ServicePrincipalName" no es nula.

## GetUserSPN.py
Herramienta para solicitar un TGS o Ticket Granting Service y posteriormente romperlo por fuerza bruta.

### Con credenciales
#### Un usuario

```bash
GetUserSPN.py 'dominio.local/user:userpass'
```

---

Escrito el 07-12-2021 a las 07:17 pm por creep33.
