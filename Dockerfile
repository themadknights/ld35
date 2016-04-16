FROM node
MAINTAINER david.morcillo@gmail.com

WORKDIR /code

RUN npm install -g webpack webpack-dev-server surge
