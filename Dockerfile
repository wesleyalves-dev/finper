FROM node:lts-alpine

LABEL maintainer="Wesley Alves <wesley_alv@outlook.com"

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install \
    && yarn global add @nestjs/cli \
    && apk add git

EXPOSE $PORT
