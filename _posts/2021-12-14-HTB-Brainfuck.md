---
layout: single
title: HTB-Brainfuck
excerpt: "WriteUp con metodología de la máquina Brainfuck."
date: 2021-12-14
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Brainfuck.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Brainfuck.png'></center>

IP -> 10.10.10.17
# Reconocimiento
## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.
[Brainfuck Nmap Result](/assets/files/WriteUps/Brainfuck.txt)

> Subdominios

## https
Añadimos los subdominios encontrados al archivo /etc/hosts. Y sospechamos de posible **Virtual Hosting**.
Abrimos la páigna y encontramos un correo.
> MAIL: orestis\@brainfuck.htb
> DNS: www\.brainfuck.htb sup3rs3cr3t.brainfuck.htb

Para realizar un pequeño descubrimiento de rutas, utilizamos el script de [nmap](/Nmap/) **http-enum**.

El wappalizer nos indica que es un **wordpress**.
Probamos rutas por defecto.
> wp-login.php

Y enumeramos usuarios en el panel de inicio de sesión.
> USUARIOS: admin administrator

Vemos que en la página tenemos la capacidad de abrir tickets. Como hemos visto que es un **wordpress** pensamos en que posiblemente se esté utilizando un plugin para gestionarlo.

> Wordpress Ticket Plugin

### wordpress
Tratamos de enumerar los plugins.

#### wpscan
Podemos hacerlo con la herramienta automatizada [wpscan]((/wordpress/)
> Plugins:
> - wp-support-plus-responsive-ticket-system. Ademas nos indica que la versión está desactualizada.

#### FUZZING manual
Aunque tambien podemos enumerar plugins [manualmente]((/wordpress/)
> wp-support-plus-responsive-ticket-system

#### Directory Listing
En este caso particular tenemos capacidad de lectura bajo la ruta wp-content/plugins/ asi que podemos ver los plugins directamente.
> wp-support-plus-responsive-ticket-system

#### Análisis del plugin
Buscamos vulnerabilidades en **searchsploit** para el plugin.
Vemos que es vulnerable a **SQLi**. Para hacer la inyección tenemos que montarnos previamente un servicio en local.

> index.html

```html
<form action="https://brainfuck.htb/wp-admin/admin-ajax.php" method="post">
	<input type="text" name="action" value="wpsp_getCatName">
	<input type="text" name="cat_id" value="0 UNION SELECT 1, CONCAT(name, CHAR(58), slug),3 FROM wp_terms WHERE term_id-1">
	<input type%="submit" name="">
</form>
```

Con el servicio **Apache** analizamos los campos que aparecen. Probamos con admin y administrator. Pero no parece funcionar.
Volvemos a buscar en **searchploit** y vemos otro exploit relacionado con **Privilege Escalation**. Analizamos este segundo script y vemos que podemos iniciar session como un usuario sin conocer la contraseña. Para ello tenemos que montarnos otro servicio y después acceder panel de inicio de session de la página.

#### Explotación

> index.html

```html
<form method="post" action="https://brainfuck.htb/wp-admin/admin-ajax.php">
        Username: <input type="text" name="username" value="administrator">
        <input type-"hidden" name="email" value-"sth">
        <input type="hidden" name="action" value="loginGuestFacebook">
        <input type="submit" value="Login">
</form>
```

Probamos el exploit con el usuario **administrator** y el usuario **admin**, vamos al panel de inicio de sesion en wp-admin y estamos dentro.

Probamos la intrusión clásica en vase a los [Themes]((/wordpress/)

Vemos los plugins que están instalados, destaca **Easy WP SMTP**. Al entrar en settings del plugin, conseguimos informacion:

> USER: orestis
> PASS: KHGUERB29DNINE
> MAIL: orestis\@brainfuck.htb

## ssh
Intentamos conectarnos por **ssh** con la credenciales obtenidas. Pero no funcionan.

## pop3
Nos conectamos con netcat al servicio [pop3](/pop3/) para autenticarnos.

Vemos que hablando de un usuario **admin** y una **contraseña** elegida durante la instalación.

Y unas credenciales para un "foro secreto".
> User: orestis
> Pass: kIEnnfEKJ#9Umd0

## https
Nos conectamos al dns que encontramos en [nmap](/Nmap/) sup3rs3cr3t.brainfuck.htb.
Iniciamos sesion como **orestis**. Vemos que hay mensajes medio cifrados, probablemente **rot13**. Hablan de una **clave ssh**, lo cual es interesante.

Probamos a decodificarlo en **rot13** con [quipquip](https://quipqiup.com/). Pero no nos da ningun resultado destacable. Parece que es un cifrado más avanzado como el **vigenere**.

En otros mensajes que no están cifrados, vemos que el usuario **orestis** firma los mensajes. Si tenemos un **texto cifrado** y un **texto en claro**.

Buscamos en internet un **vigenere online**. Utilizamos el texo cifrado para cifrar y ponemos el texto claro como clave, para conseguir la clave original.

> key: fuckmybrain

Encontramos una id_rsa
> id_rsa

## ssh
Pero la key está protegida con contraseña. ssh2john.py + john y listo

### ssh2john + john
> PASS: 3poulakia!

> user.txt


# Privilege escalation
Hay dos formas para escalar privilegios. 
 - Grupo lxd > [lxd_exploit.sh](/lxd_exploit.sh/)
 - Jugar con los archivos del escritorio.


Vemos un archivo que almacena la contraseña en otro archivo codificándola con RSA, pero vemos otro archivo debug y sospechamos que los 2 primeros números primos son los números p y q.
Utilizamos la [página](https://www.cryptool.org/en/cto/rsa-step-by-step) para descifrar textos [RSA](/RSA/). La flag está en decimal, con python, la pasamos a hexadecimal, le quitamos el '0x' y la decodificamos de hexadecimal (().decode("hex")). Y conseguimos la flag de root

> root.txt


---

Escrito el 14-12-2021 a las 07:19 pm por creep33.
