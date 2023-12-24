FROM node:lts-bullseye-slim as migrate
WORKDIR /usr/src/app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG DIRECT_URL
ENV DIRECT_URL=$DIRECT_URL

RUN apt-get update
RUN apt-get install -y jq
RUN npm install -g bun

COPY prisma/ prisma/
COPY package.json ./
RUN jq 'del(.workspaces)' package.json > tmp.json && mv tmp.json package.json

RUN bun install

RUN bun prisma migrate deploy
