#!/usr/bin/python3

from Crypto.PublicKey import RSA
from pwn import *

def def_handler(sig, frame):
    print("\n\n[!] Saliendo...\n")
    sys.exit(1)


# Ctrl_C
signal.signal(signal.SIGINT, def_handler)

# Variables globales
id_rsa_pub = "decoder.pub" # id_rsa.pub file name

p = 280651103481631199181053614640888768819
q = 303441468941236417171803802700358403049


def generatePrivateKey():

    with open(id_rsa_pub, "r") as f:
        key = RSA.importKey(f.read())

    log.info("n -> %s" % key.n)
    log.info("e -> %s" % key.e)
    log.info("p -> %s" % p)
    log.info("q -> %s" % q)
    
    n = key.n
    e = key.e
    m = n-(p+q-1)
    d = pow(e, -1, m)
    
    log.info("m -> %s" % m)
    log.info("d -> %s" % d)

    finalkey = RSA.construct((n, e, d, p, q))
    print((finalkey.exportKey()).decode())

if __name__ == '__main__':
    generatePrivateKey()

