## Stage 1 (base)
FROM node:16-alpine AS base

ENV NODE_ENV=production

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

RUN npm i npm@latest -g

USER node

COPY --chown=node:node package*.json ./

RUN npm ci \
  && npm cache clean -f

## Stage 2 (development)
FROM base AS dev

ENV NODE_ENV=development

WORKDIR /app

RUN npm install

CMD npm run start:dev

## Stage 3 (production)
FROM base AS prod

WORKDIR /app

COPY --chown=node:node dist ./dist

CMD node dist/main
