FROM node:20 AS builder

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm build

FROM nginx:alpine

COPY --from=builder dist /usr/share/nginx/html
