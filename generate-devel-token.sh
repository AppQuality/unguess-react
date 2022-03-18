#!/bin/bash

USERNAME=$(cat generate-devel-token.json | jq -r .username)
PASSWORD=$(cat generate-devel-token.json | jq -r .password)
URL=$(cat generate-devel-token.json | jq -r .url)
DATA='{"username":"'$USERNAME'","password":"'$PASSWORD'"}'

echo "REACT_APP_DEFAULT_TOKEN="$(curl -X POST -H 'Content-type: application/json' --data "$DATA" $URL/authenticate | jq -r .token  ) > .env.development.local
