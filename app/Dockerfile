FROM node:lts-bullseye-slim as prisma
WORKDIR /temp/dev

RUN npm install -g bun

RUN bun init -y
COPY prisma/ prisma/
RUN bunx prisma generate

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev

COPY package.json bun.lockb /temp/dev/
COPY app/package.json /temp/dev/app/package.json
COPY app-old/package.json /temp/dev/app-old/package.json
COPY infra/package.json /temp/dev/infra/package.json
COPY components/eslint-plugin-config/package.json /temp/dev/components/eslint-plugin-config/package.json
COPY components/schema/package.json /temp/dev/components/schema/package.json
COPY components/jobs/migrate-db/package.json /temp/dev/components/jobs/migrate-db/package.json
COPY components/workers/email-worker/package.json /temp/dev/components/workers/email-worker/package.json
COPY components/workers/order-cancel-worker/package.json /temp/dev/components/workers/order-cancel-worker/package.json

RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod

COPY package.json bun.lockb /temp/prod/
COPY app/package.json /temp/prod/app/package.json
COPY app-old/package.json /temp/prod/app-old/package.json
COPY infra/package.json /temp/prod/infra/package.json
COPY components/eslint-plugin-config/package.json /temp/prod/components/eslint-plugin-config/package.json
COPY components/schema/package.json /temp/prod/components/schema/package.json
COPY components/jobs/migrate-db/package.json /temp/prod/components/jobs/migrate-db/package.json
COPY components/workers/email-worker/package.json /temp/prod/components/workers/email-worker/package.json
COPY components/workers/order-cancel-worker/package.json /temp/prod/components/workers/order-cancel-worker/package.json

RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=prisma /temp/dev/node_modules/.prisma/ node_modules/.prisma/
COPY . .

# tests & build
ENV NODE_ENV=production
RUN bun turbo build --filter=app

# copy production dependencies and source code into final image
FROM base AS release
ENV NODE_ENV=production

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/app/dist/server/ .

# use bun user
USER bun

ENTRYPOINT [ "bun", "entry.mjs" ]
