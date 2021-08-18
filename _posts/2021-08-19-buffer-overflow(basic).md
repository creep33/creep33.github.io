---
layout: single
title: BufferOverFlow (Basic)
excerpt: "He decidido crearme una pagina para ir publicando todo lo que voy aprendiendo y asi si le es util a alguien mas, puede utilizar el contenido, tambien hare writeups de vez en cuando no tanto con el objetivo de eseñar como resolver dicha maquina sino para repasar como la hize, pero lo dicho que si a alguien le es util, ahi esta."
date: 2021-08-18
classes: wide
header:
  #teaser: /assets/images/htb-writeup-delivery/delivery_logo.png
  #teaser_home_page: true
  #icon: /assets/images/hackthebox.webp
categories:
  - Leaning
tags:  
  - BoF
  - Port Forwarding
---

Explicacion del BoF del OSCP tomando como modelo la maquina "Buff" de HTB

## Requirements
* Windows 7 x86 (VM)
* Immunity Debugger
* Mona

## Identificar posibles archivos
* WinPEAS.exe
* En el apartado:

![](/assets/images/buffer-overflow(basic)/winPEAS.png#center)

* Analizamos los binarios y buscamos en (searchsploit) vulnerabilidades
..* En este caso "CloudMe_1112.exe" es bulnerable a BoF

* En este caso el puerto que utiliza es interno (8888) asi que utilizaremos la heramienta **chisel** para hacer Port Forwarding del puerto 8888
  * <span style="color:red">*Atacante:*</span>
    * chisel server --reverse --port 1234
  * <span style="color:#7cb9e8">*Victima:*</span>
    * chisel client \<ip del atacante\>:1234 R:8888:127.0.0.1:8888
* Creamos un script en python3:

```py
#!/usr/bin/python3

import socket
import signal
import pdb

print("Hola")
```

## Comandos utiles:
Linux:
* `lsof -i:8888` --> listar servicio en el puerto 8888

Windows:

