#!/bin/bash
set -e
# npm install --global np
np $1

PACKAGE_VERSION=$(node -e 'console.log(require("./package").version)')

docker build --no-cache -t sitespeedio/coach:$PACKAGE_VERSION -t sitespeedio/coach:latest .

docker login

docker push sitespeedio/coach:$PACKAGE_VERSION
docker push sitespeedio/coach:latest
