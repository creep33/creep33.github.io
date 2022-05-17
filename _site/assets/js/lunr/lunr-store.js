var store = [{
        "title": "Archivos relevantes para eliminar",
        "excerpt":"Archivos relevantes para eliminar A continuación se presentan algunos archivos relevantes que deben considerarse para eliminar después de la realización del ejercicio de Hacking Ético en Linux y Windows. Archivos para eliminar en Linux • /var/log/messages : mensajes globales del sistema operativo. • /var/log/secure : información de autenticación y autorización....","categories": ["Concepts"],
        "tags": ["Windows","Linux"],
        "url": "http://localhost:4000/Archivos-relevantes-para-eliminar/",
        "teaser":"http://localhost:4000/assets/images/Concepts/ARPE/windows-bin.png"},{
        "title": "BufferOverFlow (Basic)",
        "excerpt":"Explicacion del BoF del OSCP tomando como modelo la maquina “Buff” de HTB Requirements Windows 7 x86 (VM) Immunity Debugger Mona Identificar posibles archivos WinPEAS.exe En el apartado: Analizamos los binarios y buscamos que permisos tiene nuestro usuario (shaun) sobre estos binarios, vemos que tiene “AllAccess” lo que nos llama...","categories": ["Concepts"],
        "tags": ["BoF","Port Forwarding"],
        "url": "http://localhost:4000/buffer-overflow(basic)/",
        "teaser":"http://localhost:4000/assets/images/Concepts/buffer-overflow(basic)/Buff-stack_explanation.png"},{
        "title": "Chisel",
        "excerpt":"Chisel Definición Chisel es una herramienta hubicada en github, con la que podemos hacer port forwarding. Port Forwarding Uso Atacante: chisel server –reverse –port &lt;puerto para chisel&gt; Victima: chisel client &lt;ip del atacante&gt;:&lt;puerto para chisel&gt; R:&lt;puerto del servicio en maquina de atacante&gt;:&lt;ip a la que accede la maquina víctima (puede...","categories": ["Tools"],
        "tags": ["Port Forwarding","CLI"],
        "url": "http://localhost:4000/Chisel/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "SQLMap",
        "excerpt":"SQLMap Cheatsheet Check if injection exists sqlmap -r Post.req sqlmap -u http://10.10.10.10/file.php?id=1 -p id sqlmap -u http://10.10.10.10/login.php --data=\"user=admin&amp;password=admin\" Get database if injection Exists sqlmap -r login.req --dbs sqlmap -u http://10.10.10.10/file.php?id=1 -p id --dbs sqlmap -u http://10.10.10.10/login.php --data=\"user=admin&amp;password=admin\" --dbs Get Tables in a Database sqlmap -r login.req -D dbname --tables sqlmap...","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/SQLMap/",
        "teaser":"http://localhost:4000/assets/images/Tools/SQLMap/sqlmap-icon.png"},{
        "title": "Silver Ticket",
        "excerpt":"Definición The Silver ticket attack is based on crafting a valid TGS for a service once the NTLM hash of service is owned (like the PC account hash). Thus, it is possible to gain access to that service by forging a custom TGS as any user. Explotación Requisitos User UserToImpersonate...","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/Silver-Ticket/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "ARPSpoof",
        "excerpt":"ARPSpoof   Definición  Herramienta para realizar envenenamiento arp.   Requisitos previos  Hay que activar la siguiente funcionalidad:  echo 1 &gt; /proc/sys/net/ipv4/ip_forward     Uso  arpspoof -i &lt;interfaz&gt; -t &lt;target_client&gt; -r &lt;target_server&gt;    Ejemplo  arpspoof -i tap0 -t 10.100.13.37 -r 10.100.13.36     Escrito el 01-12-2021 a las 01:58 am por creep33.  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/ARPSpoof/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "IP-Route",
        "excerpt":"IP Route Syntax ip route add &lt;Network-range&gt; via &lt;router-IP&gt; dev &lt;interface&gt; ip route del &lt;Network-range&gt; via &lt;router-IP&gt; dev &lt;interface&gt; Aunque también podemos intentar comunicarnos sin proporcionar la ip del router. ip route add &lt;Network-range&gt; dev &lt;interface&gt; ip route del &lt;Network-range&gt; dev &lt;interface&gt; Example ip route add 10.10.10.0/24 via 10.10.11.1 dev...","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/IP-Route/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "Active Directory",
        "excerpt":"Definición Un Active Directory o directorio activo, es un conjunto de usuarios controlados por un domain controller, que actuan como WORKSTATIONS relaccionadas entre sí. Es común en entornos empresariales. Vectores de ataque Vector Herramienta ASREPRoast GetNPUsers.py, getTGT.py Kerberoasting GetUserSPNs.py Golden Ticket GoldenPac.py Silver Ticket getST.py ldap ldapsearch, ldapdomaindump, go-windapsearch, gMSADumper...","categories": ["Concepts"],
        "tags": ["Active Directory","Windows"],
        "url": "http://localhost:4000/Active-Directory/",
        "teaser":"http://localhost:4000/assets/images/Concepts/Active_Directory/active_directory.jpg"},{
        "title": "gobuster",
        "excerpt":"Gobuster Definición Herramienta creada en golang, para fuzzear directorios, subdirectorios y archivos por extensión. Ejemplo de uso gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http\\://10.10.10.10 --no-error -t 200 -d -x php -b 404,401 Este comando fuzzearía bajo la ruta http://10.10.10.10, directorios, archivos con extensión php y archivos de backup, utilizando el diccionario...","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/gobuster/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "ASREPRoast",
        "excerpt":"Definición El ASREPRoast attack busca usuarios sin Kerberos pre-authentication required attribute (DONT_REQ_PREAUTH) de un Active Directory GetNPUsers.py Herramienta para solicitar un TGT o Ticket Granting Ticket y posteriormente romperlo por fuerza bruta. TGT sin contraseña GetNPUsers.py dominio.local/ -no-pass -usersfile users Ex: GetNPUsers.py dominio.local/ -no-pass -usersfile users Escrito el 07-12-2021 a...","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/ASREPRoast/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "Crackmapexec",
        "excerpt":"Definición Crackmapexec es una herramienta para enumerar Active Directory, principalmente los servicios smb y winrm. Uso Esta herraminta tine distintos modos de uso. Para enumerar información del AD. crackmapexec smb 10.10.10.10 Aqui obtenemos el nombre del dominio, lo añadiremos en /etc/hosts para poder realizar futuros posibles ataques. Tambien obtenemos información...","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/Crackmapexec/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "HTB-Resolute",
        "excerpt":"IP -&gt; 10.10.10.169 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Resolute Nmap Result Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windows Server 2016 x64 Dominio: megabank.local Signing: True SMBv1: True smbclient y smbhost Listamos servicios del SMB mediante un...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Resolute/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Resolute.png"},{
        "title": "Kerberoasting",
        "excerpt":"Definición El objetivo de Kerberoasting es recolectar tickets TGS para servicios que se ejecutan en nombre de cuentas de usuario en el Active Directory, no de cuentas de ordenador. Así, parte de estos tickets TGS están cifrados con claves derivadas de las contraseñas de los usuarios. Como consecuencia, sus credenciales...","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/Kerberoasting/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "Kerberos",
        "excerpt":"Definición Kerberos es un protocolo de autenticación de redes de ordenador creado por el MIT que permite a dos ordenadores en una red insegura demostrar su identidad mutuamente de manera segura. Por defecto opera en el puerto -&gt; 88 kerbrute Esta herramienta de GitHub permite enumerar el servicio Kerberos de...","categories": ["Service"],
        "tags": ["Windows","Active Directory"],
        "url": "http://localhost:4000/Kerberos/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "SMB",
        "excerpt":"Definición SMB es un servicio de Microsoft Windows por el cual se compartes diferentes archivos en la red. La adaptación a Linux se llama Samba. Por defecto opera en los puertos -&gt; 139, 445 Uso Para conectarse a un servicio smb tenemos diferentes herramientas con diferentes usos. Null session En...","categories": ["Service"],
        "tags": ["Windows"],
        "url": "http://localhost:4000/SMB/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "RPC",
        "excerpt":"Definición rpc o Remote Process Call. Se utiliza para listar información del Active Directory asi como usuarios y grupos. Por defecto opera en los puertos -&gt; 135, 593 rpcclient Null session rcpclient -U \"\" 10.10.10.10 -N Autenticación rpcclient -U \"user%pass\" 10.10.10.10 Comandos útiles Comando Descripción Ejemplo enumdomusers Lista los usuarios...","categories": ["Service"],
        "tags": ["Windows"],
        "url": "http://localhost:4000/rpc/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "BloodHound",
        "excerpt":"Definición Bloodhound es una herramienta que nos permite listar información de un Active Directory, la cual se aprovecha de una base de datos neo4j que tenemos que estar corriendo en nuestro equipo. Y tenemos que proporcionarle datos obtenidos con diferentes utilidades que se explicarán más adelante. BloodHound utiliza la teoría...","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/Bloodhound/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "HTB-Forest",
        "excerpt":"IP -&gt; 10.10.10.161 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Forest Nmap Result Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windows Server 2016 Dominio: htb.local Signing: True SMBv1: True Añadimos el dominio al /etc/hosts smbclient y smbhost Listamos servicios...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Forest/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Forest.png"},{
        "title": "getTGT.py",
        "excerpt":"Definición  Se utiliza para solicitar un ticket TGT de un Active Directory. Similar a GetNPUsers.py pero requiere de credenciales válidas (también puede ser un hash NT). Esta herramienta funciona exclusivamente por Kerberos.   Uso  getTGT.py dominio.local/user:userpass getTGT.py dominio.local/user -hashes &lt;lm&gt;:&lt;nt&gt;   ","categories": ["Tools"],
        "tags": ["CLI","Active Directory"],
        "url": "http://localhost:4000/getTGT.py/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "LDAP",
        "excerpt":"Definición LDAP (Lightweight Directory Access Protocol) es un protocolo de software que permite a cualquier persona localizar organizaciones, individuos y otros recursos como archivos y dispositivos en una red, ya sea en la Internet pública o en una intranet corporativa. LDAP es una versión “ligera” (menor cantidad de código) del...","categories": ["Service"],
        "tags": ["Windows"],
        "url": "http://localhost:4000/ldap/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "secretsdump.py",
        "excerpt":"Definición Herramienta para obtener las credenciales de una máquina o DC de un Active Directory. Para ello tenemos que proporcionarle distintos registros. Uso Podemos obtener los diferentes hashes del Almacenamiento de credenciales SAM Obtención de registros. La forma más facil de obtenerlos es copiarlos del registro reg save HKLM\\sam sam...","categories": ["Tools"],
        "tags": ["CLI","Windows","Active Directory"],
        "url": "http://localhost:4000/secretsdump.py/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "HTB-Active",
        "excerpt":"IP -&gt; 10.10.10.100 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Active Nmap Result Winrm no está abierto Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windows 6.1 x64 Dominio: active.htb Signing: True SMBv1: False smbclient y smbhost Listamos servicios mediante...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Active/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Active.png"},{
        "title": "gpp-decrypt",
        "excerpt":"Definición (SYSVOL) Si accedemos al SYSVOL, con estructura similar a: DfrsPrivate Policies scripts Podemos tratar de encontrar un archivo groups.xml SYSVOL/Policies/{*}/MACHINE/Preferences/Groups/groups.xml Este arvhivo contiene una cpassword que podemos desencriptar con herramientas como gpp-decrypt ya que Microsoft publicó la AES key. Uso gpp-decrypt &lt;key&gt; En el mismo arvhivo groups.xml nos muestra...","categories": ["Tools"],
        "tags": ["CLI","Windows"],
        "url": "http://localhost:4000/gpp-decrypt/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "masscan",
        "excerpt":"Definición  Herramienta para descubrir puertos abiertos en segmentos de red grandes. Se puede encontrar en GitHub.     Escrito el 09-12-2021 a las 05:40 am por creep33.  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/masscan/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "reg.py",
        "excerpt":"Definición  Herramienta que sirve para dumpear registros del sistema, proporcionando credenciales válidas.   Uso   reg.py dominio.local/user:userpass@10.10.10.10 query -keyName &lt;reghive&gt; reg.py dominio.local/user@10.10.10.10 -hashes &lt;LMHASH&gt;:&lt;NTHASH&gt; query -keyName &lt;reghive&gt;   Tenemos que proporcionar uno de los registry hives, que se pueden encontrar en internet.  ","categories": ["Tools"],
        "tags": ["CLI","Windows"],
        "url": "http://localhost:4000/reg.py/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "SNMP",
        "excerpt":"Definición SNMP - Simple Network Management Protocol es un protocolo utilizado para monitorizar diferentes dispositivos en la red (como routers, switches, impresoras, IoTs…). Por defecto opera en los puertos -&gt; 161, 162, 10161, 10162 por UDP Herramientas snmpwalk Herramienta para enumerar los servicios de snmp, necesita de una community string...","categories": ["Service"],
        "tags": ["Windows","Linux"],
        "url": "http://localhost:4000/snmp/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "HTB-Lame",
        "excerpt":"IP -&gt; 10.10.10.3 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Lame Nmap Result ftp Vemos que el script ftp-anon de nmap nos reporta que está operativo el inicio de sesión anonimo. Pero al conectarnos no encontramos nada. Buscamos la versión del ftp (vsftpd 2.3.4) que está corriendo y...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Lame/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Lame.png"},{
        "title": "HTB-Brainfuck",
        "excerpt":"IP -&gt; 10.10.10.17 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Brainfuck Nmap Result Subdominios https Añadimos los subdominios encontrados al archivo /etc/hosts. Y sospechamos de posible Virtual Hosting. Abrimos la páigna y encontramos un correo. MAIL: orestis\\@brainfuck.htb DNS: www.brainfuck.htb sup3rs3cr3t.brainfuck.htb Para realizar un pequeño descubrimiento de rutas, utilizamos...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Brainfuck/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Brainfuck.png"},{
        "title": "Wordpress",
        "excerpt":"Definición Wordpress es un gestor de contenido web. Se complementa con el uso de extensiones llamadas “plugins” los cuales hay que actualizar porque pueden ser potenciales vectores de ataque. Enumeración Rutas Comunes index.php license.txt contains useful information such as the version WordPress installed. wp-activate.php is used for the email activation...","categories": ["Concepts"],
        "tags": ["CMS"],
        "url": "http://localhost:4000/Wordpress/",
        "teaser":"http://localhost:4000/assets/images/Concepts/CMS/Wordpress/Wordpress.png"},{
        "title": "Nmap",
        "excerpt":"Definición La herramienta nmap se utiliza para hacer reconocimiento a nivel de red, tanto de descubrimiento de hosts, como descubrimiento de puertos. Uso Nmap tiene una larga lista de opciones, estas son algunas de las más comunes. Flags Flag Función Ejemplo -p &lt;ports&gt; Indica los puertos a escanear -p- (Todos...","categories": ["Tools"],
        "tags": ["Generic"],
        "url": "http://localhost:4000/Nmap/",
        "teaser":"http://localhost:4000/assets/images/Tools/Nmap/nmap-logo.png"},{
        "title": "smbserver.py",
        "excerpt":"Definición  Herramienta para crear un servicio por smb.   Uso   Sin contraseña  smbserver.py smbFolder $(pwd) -smb2support   Con contraseña  smbserver.py smbFolder $(pwd) -smb2support -username 'user' -password 'userpass'    Escrito el 07-12-2021 a las 07:50 pm por creep33.  ","categories": ["Tools"],
        "tags": ["CLI","Linux"],
        "url": "http://localhost:4000/smbserver.py/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "winrm",
        "excerpt":"Definición Servicio por el cual los usuarios de windows pueden obtener una consola remote proporcionando credenciales. Estos usuarios tinen que pertenecer al groupo “Remote Management Users”. Por defecto opera en los puertos -&gt; 5985, 5986 Evil-winrm Si tenemos credenciales válidas, que hemos comprobado con Crackmapexec y obtenemos “pwned” en winrm....","categories": ["Service"],
        "tags": ["Windows"],
        "url": "http://localhost:4000/winrm/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "CeWl",
        "excerpt":"Definición  Crea diccionarios en base a las palabras que aparecen en una página.   Uso  cewl -w diccionario.txt http://10.10.10.10   Entre las distintas opciones encontramos una para que nos añada los numeros también.   cewl -w diccionario.txt http://10.10.10.10 --with-numbers     Escrito el 09-12-2021 a las 05:10 pm por creep33.  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/CeWL/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "RSA",
        "excerpt":"Definición Método para encriptar que se basa en dos claves, una pública y otra privada. Números n -&gt; p*q, este número se puede extraer de una clave pública e -&gt; Otro número que se encuentra en la clave pública d -&gt; función multiplicativa inversa de e p -&gt; número primo...","categories": ["Concepts"],
        "tags": ["Criptografía"],
        "url": "http://localhost:4000/RSA/",
        "teaser":"http://localhost:4000/assets/images/Concepts/crypt.png"},{
        "title": "wfuzz",
        "excerpt":"Definición Herramienta que se utiliza para fuzzear servicios web, similar a la herramienta gobuster con el parámetro fuzz. Pero aunque esta herramienta nos permite utilizar varios diccionarios al mismo tiempo y utilizar varios parámetros para fuzzear (FUZZ, FU2Z, FU3Z). Uso wfuzz [parámetros] &lt;url&gt; Flag Utilidad Ejemplo -c Colores -c –hc...","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/wfuzz/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "HTB-APT",
        "excerpt":"IP -&gt; 10.10.10.213 Reconociemto Nmap Utilizamos nmap y obtenemos los siguientes resultados. APT Nmap Result http whatweb Utilizamos la herramienta whatweb para enumerar información del servicio http. Y obtenemos los siguientes resultados. IIS 10.0 Abrimos la página en firefox. En la parte inferior encontramos que esta diseñada por w3layout, pero...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-APT/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/APT.png"},{
        "title": "HTB-CTF",
        "excerpt":"IP -&gt; 10.10.10.122 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. CTF Nmap Result Como vemos un servicio http corriendo, lanzamos el script de nmap http-enum para enumerar posibles rutas. login.php Encontramos un WAF porque no encontramos el servicio, esperamos un minuto a que nos quiten el ban. No...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-CTF/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/CTF.png"},{
        "title": "HTB-Chainsaw",
        "excerpt":"IP -&gt; 10.10.10.142 Nmap Utilizamos nmap y obtenemos los siguientes resultados. Chainsaw Nmap Result ftp Entramos como el usuario anonymous. ftp&gt; prompt off ftp&gt; mget * WeaponizedPing.jpeg WeaponizedPing.sol address.txt Vemos unos archivo, al investigarlos ecnontramos un solc, contract, etherium, Solidity smart contract languaje, blockchain… Nos encontramos frente a un Smart...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Chainsaw/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Chainsaw.png"},{
        "title": "HTB-Enterprise",
        "excerpt":"IP -&gt; 10.10.10.61 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Enterprise Nmap Result whatweb Con la herramienta whatweb comprobamos si nos detecta un CMS. 80 -&gt; Wordpress 443 -&gt; (N/A) 8080 -&gt; Joomla https Con openssl comprobamos el certificado para obtener dominios y correos. Añadimos el host al...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Enterprise/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Enterprise.png"},{
        "title": "HTB-Falafel",
        "excerpt":"IP -&gt; 10.10.10.73 Nmap Utilizamos nmap y obtenemos los siguientes resultados. Falafel Nmap Result http Vemos un panel de autenticación y un robots.txt que desactiva todo lo que acabe en .txt Probamos credenciales típicas en el panel de autenticación. Al probar vemos que podemos validar usuarios válidos, admin es un...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Falafel/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Falafel.png"},{
        "title": "HTB-Fuse",
        "excerpt":"IP -&gt; 10.10.10.193 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Fuse Nmap Result Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windows Server 2016 x64 Dominio: fabricorp.local Signing: True SMBv1: True smbclient y smbhost Listamos servicios mediante un [null session](/SMB/...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Fuse/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Fuse.png"},{
        "title": "HTB-Ghoul",
        "excerpt":"IP -&gt; 10.10.10.101 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Ghoul Nmap Result http(80,8080) Con nmap utilizamos el script http-enum para fuzzear rutas. Pero no descubre nada Con whatweb escaneamos los servicios. 80: Servicio Apache 8080: 401 Unauthorized -&gt; Necesitamos credenciales http (80) Con CeWl nos montamos un...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Ghoul/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Ghoul.png"},{
        "title": "HTB-Reel2",
        "excerpt":"IP -&gt; 10.10.10.210 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Reel2 Nmap Result No vemos el servicio SMB aunque si encontramos el servicio winrm disponible. http:80 403 Forbidden https:443 wappalizer Microsoft IIS 8.5 Fuzz Utilizamos herramientas como gobuster o wfuzz para numerar directorios. /owa -&gt; Servicio de correo....","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Reel2/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Reel2.png"},{
        "title": "HTB-Sauna",
        "excerpt":"IP -&gt; 10.10.10.175 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Sauna Nmap Result Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windiws 10 Dominio: EGOTISTICAL-BANK.LOCAL Signing: True SMBv1: False smbclient y smbhost Listamos servicios mediante un [null session](/SMB/ Pero no...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Sauna/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Sauna.png"},{
        "title": "HTB-Static",
        "excerpt":"IP -&gt; 10.10.10.246 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Static Nmap Result http El robots, nos reporta 2 rutas. /.ftp_uploads/ /vpn/ Descargamos el archivo “db.sql.gz” para analizarlo. Nos dice que está corrupto. Tenemos que restaurarlo. db.sql.gz Mediante la herramienta fixgz restauramos el archivo y lo extraemos. Al...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Static/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Static.png"},{
        "title": "Ebowla",
        "excerpt":"Definición  Herramienta para crear un malware genético en base a variables de entorno. Se puede utilizar para bypassear diferentes antivirus.   GitHub: ebowla     Escrito el 16-12-2021 a las 09:46 am por creep33.  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/ebowla/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "fixgz.md",
        "excerpt":"Definición  Herramienta para recomponer archivos comprimidos .gz Esta herramienta se encuentra en GitHub.   Uso  Windows:  .\\fixgz.exe corrupted.gz restored.gz   Linux:  g++ ./fixgz.cpp -o fixgz ./fixgz corrupted.gz restored.gz  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/fixgz/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "lxd_exploit.sh",
        "excerpt":"Definición Script creado por s4vitar y vowkin, para abusar del grupo lxd. El concepto se basa en crear un contenedor en el cual somo root y en el proceso crear una montura en el contenedor de la propia máquina host, pudiendo así, retocar archivos para ganar persistencia. Uso Una vez...","categories": ["Tools"],
        "tags": ["CLI","Linux"],
        "url": "http://localhost:4000/lxd_exploit.sh/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "whatweb",
        "excerpt":"Definición  Herramienta para extraer información de un servicio http, similar a wappalizer en un navegador.   Uso  whatweb http://10.10.10.10   O para ver concretamente desde donde extrae la infromación.  whatweb http://10.10.10.10 -v  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/whatweb/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "winpeas",
        "excerpt":"Definición  Winpeas es una herramienta que automatiza la enumeracion a nivel de sistema de una máquina windows.   Uso  Basta con ejecutar el binario situado en el GitHub.   Alternatives  Otras herramienta similares para enumeración de maquinas windows.     Seatbelt.exe  ","categories": ["Tools"],
        "tags": ["CLI","Windows"],
        "url": "http://localhost:4000/winpeas/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "Almacenamiento de credenciales",
        "excerpt":"Windows Administrador de cuentas de seguridad (SAM) Las credenciales locales están presentes en este archivo, las contraseñas son hash. C:\\Windows\\System32\\config\\SAM LSASS En la memoria de este proceso se guardan diferentes credenciales. Secretos LSA LSA puede guardar en el disco algunas credenciales: Contraseña de la cuenta del ordenador del Directorio Activo...","categories": ["Concepts"],
        "tags": ["Windows","Linux"],
        "url": "http://localhost:4000/Almacenamiento-de-credenciales/",
        "teaser":"http://localhost:4000/assets/images/Concepts/id.png"},{
        "title": "GIT Cheatsheet",
        "excerpt":"Definición Git es un software de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia, la confiabilidad y compatibilidad del mantenimiento de versiones de aplicaciones cuando estas tienen un gran número de archivos de código fuente. SetUP git config --global user.name &lt;user&gt; git config --global user.email &lt;email&gt; git...","categories": ["Tools"],
        "tags": ["Generic"],
        "url": "http://localhost:4000/GIT/",
        "teaser":"http://localhost:4000/assets/images/Tools/GIT/git-logo.png"},{
        "title": "HTB-Reel",
        "excerpt":"IP -&gt; 10.10.10.77 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Reel Nmap Result ftp Tratamos de hacer una autenticación anonymous, y nos conecta. Listamos los directorios que hay. AppLocker.docx readme.txt Windows Event Forwarding.docx OS file * cat readme.txt libreoffice AppLocker.docx libreoffice Windows Event Forwarding.docx En el readme vemos...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Reel/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Reel.png"},{
        "title": "Tmux Cheatsheet",
        "excerpt":" ","categories": ["Tools"],
        "tags": ["Generic"],
        "url": "http://localhost:4000/Tmux/",
        "teaser":"http://localhost:4000/assets/images/Tools/Tmux/Tmux-logo.png"},{
        "title": "Olevba",
        "excerpt":"Definición  Olevba y olevba3 son herramientas para mirar si un archivo office tiene macros.   Uso  olevba -a &lt;file&gt;     Escrito el 16-12-2021 a las 09:46 am por creep33.  ","categories": ["Tools"],
        "tags": ["CLI"],
        "url": "http://localhost:4000/olevba/",
        "teaser":"http://localhost:4000/assets/images/Tools/bash-icon.png"},{
        "title": "POP3",
        "excerpt":"Definición El Post Office Protocol (POP) es un tipo de red informática y protocolo estándar de Internet que extrae y recupera el correo electrónico de un servidor de correo remoto para su acceso por la máquina host. POP es un protocolo de capa de aplicación en el modelo OSI que...","categories": ["Service"],
        "tags": ["Windows"],
        "url": "http://localhost:4000/pop3/",
        "teaser":"http://localhost:4000/assets/images/Services/service.png"},{
        "title": "HTB-Bank",
        "excerpt":"IP -&gt; 10.10.10.29 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Bank Nmap Result http whatweb Utilizamos whatweb para extraer informacion pero no obtenemos ninguna información relevante. Virtual Hosting Probamos a ver si se está realizando virtual hosting. Con el dominio “bank.htb”. Añadimos en dominio “bank.htb” al /etc/hosts bank.htb...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Bank/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Bank.png"},{
        "title": "HTB-Wall",
        "excerpt":"IP -&gt; 10.10.10.157 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Wall Nmap Result http whatweb Utilizamos la herramienta whatweb para enumerar información del servicio http. Pero no obtenemos información relevante. http-enum Mediante el script http-enum fuzzeamos el servicio web. Fuzzing Fuzzeamos el servicio http con herramientas como wfuzz...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Wall/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Wall.png"},{
        "title": "HTB-Sniper",
        "excerpt":"IP -&gt; 10.10.10.151 Reconocimiento Nmap Utilizamos nmap y obtenemos los siguientes resultados. Sniper Nmap Result Crackmapexec Usamos Crackmapexec para enumerar información del Active Directory y añadimos el dominio al /etc/hosts OS: Windows 10 Dominio: Sniper Signing: False SMBv1: False smbclient y smbhost Listamos servicios mediante un [null session](/SMB/ Pero necesitamos...","categories": ["WriteUps"],
        "tags": ["HTB"],
        "url": "http://localhost:4000/HTB-Sniper/",
        "teaser":"http://localhost:4000/assets/images/WriteUps/Sniper.png"},{
        "title": "Apache Tomcat",
        "excerpt":"Definición Apache Tomcat funciona como un contenedor de servlets desarrollado bajo el proyecto Jakarta en la Apache Software Foundation. Tomcat implementa las especificaciones de los servlets y de JavaServer Pages de Oracle Corporation. Explotación Web /manger/html -&gt; Ruta de administración Credenciales por defecto: USER: tomcat PASS: tomcat Path vuln Si...","categories": ["Concepts"],
        "tags": ["CMS"],
        "url": "http://localhost:4000/Apache-Tomcat/",
        "teaser":"http://localhost:4000/assets/images/Concepts/CMS/Apache_Tomcat/Apache_Tomcat.png"},{
        "title": "Joomla",
        "excerpt":"Definición Joomla! es un sistema de gestión de contenidos que permite desarrollar sitios web dinámicos e interactivos. Permite crear, modificar o eliminar contenido de un sitio web de manera sencilla a través de un “panel de administración”. Explotación Una vez hemos iniciado con credenciales válidas y con capacidad de editar....","categories": ["Concepts"],
        "tags": ["CMS"],
        "url": "http://localhost:4000/Joomla/",
        "teaser":"http://localhost:4000/assets/images/Concepts/CMS/Joomla/Joomla.png"},{
        "title": "WPA cracking with aircrack-ng",
        "excerpt":"Getting a handshake Set interface to monitor mode airmon-ng check kill airmon-ng start wlan0 Choose a target airodump-ng wlan0mon We will choose a target who has PSK auth method, and we will store the chanel, the bssid the essid and a client bssid. Example target: ESSID: wifu BSSID: 34:08:04:09:3D:38 Channel:...","categories": ["Wifi"],
        "tags": ["CLI","Aircrack-ng","Wifi Hacking","WPA"],
        "url": "http://localhost:4000/WPA-Cracking-With-Aircrack/",
        "teaser":"http://localhost:4000/assets/images/Wireless/aircrack-icon.jpg"}]
