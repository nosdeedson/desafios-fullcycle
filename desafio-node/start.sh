#/bin/bash

node /app/src/index.js &

nginx -g "daemon off;"