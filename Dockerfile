ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /usr/src/template

RUN sudo npm i -g pnpm -y

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . . 

RUN npx prisma generate
RUN pnpm run build
RUN pnpm prune --production

FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/template

COPY --from=builder /usr/src/template/node_modules ./node_modules
COPY --from=builder /usr/src/template/dist ./dist
COPY --from=builder /usr/src/template/generate ./generate
COPY --from=builder /usr/src/template/package.json ./
COPY --from=builder /usr/src/template/pnpm-lock.yaml ./
COPY --from=builder /usr/src/template/prisma ./prisma
COPY --from=builder /usr/src/template/.env ./

# PORT Maping

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Run wih module-alias
