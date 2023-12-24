FROM node:lts-bullseye-slim as migrate
WORKDIR /usr/src/app

RUN npm install -g bun

RUN jq 'del(.workspaces)' package.json > tmp.json && mv tmp.json package.json

COPY prisma/ prisma/
COPY package.json ./

RUN bun install

RUN bun prisma migrate deploy
RUN bun prisma db seed
