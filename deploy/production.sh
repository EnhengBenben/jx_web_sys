#!/bin/bash
set -e 
set -o pipefail

PROJECT_DIR=/var/www/vhosts/jx/jx_web_sys
SERVER_IP=115.28.1.250

echo 'Create temporary directory...'
ssh deploy@$SERVER_IP "mkdir -p $PROJECT_DIR/tmp && rm -rf $PROJECT_DIR/tmp/*"
echo 'Uploading source code...'
scp -r -v ./dist/* deploy@$SERVER_IP:$PROJECT_DIR/tmp/
echo 'Publish new version...'
ssh deploy@$SERVER_IP "rm -rf $PROJECT_DIR/current && mv $PROJECT_DIR/tmp $PROJECT_DIR/current"
echo 'Done'