---
layout: single
title: Almacenamiento de credenciales
excerpt: "Diferentes tipos de credenciales, dónde se almacenan en cada sistema operativo, y cómo tratar de extraerlas."
date: 2021-12-15
classes: wide
header:
  teaser: /assets/images/Concepts/id.png
  teaser_home_page: true
  icon: /assets/images/concept.png
categories:
  - Concepts
tags:
  - Windows
  - Linux

---


# Windows
## Administrador de cuentas de seguridad (SAM)

Las credenciales locales están presentes en este archivo, las contraseñas son hash.

> C:\Windows\System32\config\SAM

## LSASS
En la memoria de este proceso se guardan diferentes credenciales.

## Secretos LSA
LSA puede guardar en el disco algunas credenciales:
- Contraseña de la cuenta del ordenador del Directorio Activo (controlador de dominio inalcanzable).
- Contraseñas de las cuentas de los servicios de Windows
- Contraseñas de las tareas programadas
- Más (contraseña de las aplicaciones IIS...)

## NTDS.dit
Es la base de datos del [Active Directory](/Active-Directory/). Sólo está presente en los Controladores de Dominio.

> C:\Windows\ntds\ntds.dit

## Almacén del gestor de credenciales
Permite a los navegadores y otras aplicaciones de Windows guardar las credenciales.


# Linux
El sistema buscará credenciales en el /etc/passwd y poosteriormente en el /etc/shadow, normalmente se encontrarán en el segundo menocionado

> /etc/passwd
> /etc/shadow
