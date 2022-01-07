---
layout: single
title: Apache Tomcat
excerpt: "Posibles vectores de ataque al enfrentarse a un Apache Tomcat, rutas relevantes y archivos de configuración post-explotación relevantes."
date: 2022-01-07
classes: wide
header:
  teaser: /assets/images/Concepts/CMS/Apache_Tomcat/Apache_Tomcat.png
  teaser_home_page: true
  icon: /assets/images/concept.png
categories:
  - Concepts
tags:
  - CMS
---


# Definición
Apache Tomcat funciona como un contenedor de servlets desarrollado bajo el proyecto Jakarta en la Apache Software Foundation. Tomcat implementa las especificaciones de los servlets y de JavaServer Pages de Oracle Corporation.

# Explotación
## Web
> /manger/html ->  Ruta de administración

Credenciales por defecto:
> USER: tomcat

> PASS: tomcat

### Path vuln
Si la ruta /manager/html está bloqueada, se puede tratar de acceder a esta mediante:
> /lalala/..;/manager/html

O mediante un parámetro:
> /;param=value/manager/html

## Archivos Relevantes

> /usr/share/tomcat*/conf/tomcat-users.xml -> Archivo con credenciales hardcodeadas

---

Escrito el 07-01-2022 a las 09:11 pm por creep33.
