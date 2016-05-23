#!/bin/bash
# It would be nice to use ECDSA but Rackspace CLB can't connect to ECDSA servers and I'm tired of errors in our logs.
#/usr/local/opt/openssl/bin/openssl ecparam -name prime256v1 -genkey -out server.key
/usr/local/opt/openssl/bin/openssl genrsa -out server.key 2048
/usr/local/opt/openssl/bin/openssl req -new -x509 -days 3650 -key server.key -out server.pem -subj "/C=US/ST=Illinios/L=Chicago/O=neighborhood/CN=neighborhood" -sha256
