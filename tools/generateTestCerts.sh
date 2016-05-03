#!/usr/bin/env bash

# Adapted from http://www.akadia.com/services/ssh_test_certificate.html
# and https://github.com/coolaj86/nodejs-self-signed-certificate-example/blob/master/make-root-ca-and-certificates.sh

openssl genrsa \
  -des3 \
  -out server.key \
  1024

openssl req \
  -new \
  -key server.key \
  -out server.csr \
  -subj "/C=US/ST=Utah/L=Provo/O=ACME Signing Authority Inc/CN=example.com"

openssl x509 \
  -req \
  -days 1024 \
  -in server.csr \
  -signkey server.key \
  -out server.crt
