#!/bin/sh

CONFIG_FILE_PATH="/build/static/env-config.js"

# Recreate config file
rm -rf $CONFIG_FILE_PATH
touch $CONFIG_FILE_PATH

# Add assignment
echo "window.react_env = {" > $CONFIG_FILE_PATH

VARIABLES=$(printenv | grep REACT_APP)


# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [ -n "$line" ];
do
    # Split env variables by character `=`
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
        echo "  $varname: \"$varvalue\"," >> $CONFIG_FILE_PATH
    fi
done << EOF
$VARIABLES
EOF

echo "}" >> $CONFIG_FILE_PATH

nginx -g 'daemon off;'