#!/bin/bash
set -euo pipefail

# enable and start docker service
systemctl enable docker.service
systemctl start docker.service

# login to ecr
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

# read docker image version from manifest
DOCKER_IMAGE=$(cat "/home/ec2-user/unguess-react/docker-image.txt")
DOCKER_COMPOSE_FILE="/home/ec2-user/$APPLICATION_NAME/docker-compose.yml"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)
ENVIRONMENT=$(aws ec2 describe-tags --filters "Name=resource-id,Values=$INSTANCE_ID" "Name=key,Values=environment"  --output=text | cut -f5)
VERSION=$(echo $DOCKER_IMAGE | cut -d: -f2)

# pull docker image from ecr
docker pull 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE

# get env variables from parameter store
mkdir -p /var/docker/keys
mkdir -p /home/ec2-user/$APPLICATION_NAME

if test -f "$DOCKER_COMPOSE_FILE"; then
    set +e
    IS_RUNNING=$(docker ps -a | grep $DOCKER_IMAGE| wc -l)
    set -e
    if [ "$IS_RUNNING" -eq "1" ]; then
        docker-compose -f $DOCKER_COMPOSE_FILE down
    fi
fi

echo "
version: '3'
services:
  app:
    image: 163482350712.dkr.ecr.eu-west-1.amazonaws.com/$DOCKER_IMAGE
    restart: always
    ports:
      - '80:80'
    environment:
      PORT: 80
      REACT_APP_ENVIRONMENT: $ENVIRONMENT
      REACT_APP_VERSION: $DOCKER_IMAGE
    logging:
      driver: awslogs
      options:
        awslogs-region: eu-west-1
        awslogs-group: "unguess-app-react-${ENVIRONMENT}"
        awslogs-stream: ${VERSION}
        awslogs-create-group: 'true'

" > $DOCKER_COMPOSE_FILE


docker-compose -f $DOCKER_COMPOSE_FILE up -d
