FROM node:20 AS builder

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=builder /usr/app/dist/vtm-relationship-boons /usr/share/nginx/html
