#!/bin/bash
set -e

google-chrome --version
firefox --version

# Inspired by docker-selenium way of shutting down
function shutdown {
  kill -s SIGTERM $PID
  wait $PID
}

exec node /usr/src/app/bin/webcoach.js "$@" &

PID=$!

trap shutdown SIGTERM SIGINT
wait $PID
