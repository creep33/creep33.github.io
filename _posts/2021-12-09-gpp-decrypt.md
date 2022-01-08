---
layout: single
title: gpp-decrypt
excerpt: "Herramienta para obtener en texto claro la contraseña de un groups.xml."
date: 2021-12-09
classes: wide
header:
  teaser: /assets/images/Tools/bash-icon.png
  teaser_home_page: true
  icon: /assets/images/tool.png
categories:
  - Tools
tags:
  - CLI
  - Windows

---


# Definición (SYSVOL)

Si accedemos al SYSVOL, con estructura similar a:
> DfrsPrivate  
> Policies  
> scripts

Podemos tratar de encontrar un archivo groups.xml
> SYSVOL/Policies/{\*}/MACHINE/Preferences/Groups/groups.xml

Este arvhivo contiene una **cpassword** que podemos desencriptar con herramientas como **gpp-decrypt** ya que Microsoft publicó la AES key.

# Uso

```bash
gpp-decrypt <key>
```

En el mismo arvhivo groups.xml nos muestra el usuario a quién pertenece la contraseña.


---

Escrito el 09-12-2021 a las 05:28 am por creep33.
