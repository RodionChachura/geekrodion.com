#!/bin/bash

REPOSITORY_URL=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/tf-ci

eval $(aws ecr get-login --no-include-email --region $AWS_REGION)

docker build -t $REPOSITORY_URL:$1 .
docker push $REPOSITORY_URL:$1
