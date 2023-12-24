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

FROM base AS migrate
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# run the migration
USER bun
RUN bun prisma migrate deploy
