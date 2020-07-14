FROM node:latest

RUN apt-get update \
  && apt-get install -y python-dev \
  && curl -O https://bootstrap.pypa.io/get-pip.py \
  && python get-pip.py \
  && pip install awscli \
  && npm install -g gatsby-cli