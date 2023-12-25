FROM node:lts-bullseye-slim as prisma
WORKDIR /temp/dev

RUN apt-get update
RUN apt-get install -y jq
RUN npm install -g bun

COPY prisma/ prisma/
COPY package.json ./
RUN jq 'del(.workspaces)' package.json > tmp.json && mv tmp.json package.json

RUN bun install

RUN bun prisma generate

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
ARG WORKER_DIR=email-worker
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev

COPY package.json bun.lockb /temp/dev/
COPY app/package.json /temp/dev/app/
COPY app-old/package.json /temp/dev/app-old/
COPY infra/package.json /temp/dev/infra/
COPY components/eslint-plugin-config/package.json /temp/dev/components/eslint-plugin-config/
COPY components/schema/package.json /temp/dev/components/schema/
COPY components/jobs/migrate-db/package.json /temp/dev/components/jobs/migrate-db/
COPY components/workers/email-worker/package.json /temp/dev/components/workers/email-worker/
COPY components/workers/order-cancel-worker/package.json /temp/dev/components/workers/order-cancel-worker/

RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod

COPY package.json bun.lockb /temp/prod/
COPY app/package.json /temp/prod/app/
COPY app-old/package.json /temp/prod/app-old/
COPY infra/package.json /temp/prod/infra/
COPY components/eslint-plugin-config/package.json /temp/prod/components/eslint-plugin-config/
COPY components/schema/package.json /temp/prod/components/schema/
COPY components/jobs/migrate-db/package.json /temp/prod/components/jobs/migrate-db/
COPY components/workers/email-worker/package.json /temp/prod/components/workers/email-worker/
COPY components/workers/order-cancel-worker/package.json /temp/prod/components/workers/order-cancel-worker/

RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules/ node_modules/
COPY . .

# tests & build
ENV NODE_ENV=production
RUN bun turbo build --filter=${WORKER_DIR}

# copy production dependencies and source code into final image
FROM base AS release
ENV NODE_ENV=production

COPY --from=install /temp/prod/node_modules/ node_modules/
COPY --from=prisma /temp/dev/node_modules/.prisma/ node_modules/.prisma/
COPY --from=prerelease /usr/src/app/components/workers/${WORKER_DIR}/build/ .

# use bun user
USER bun

ENTRYPOINT [ "bun", "index.js" ]
