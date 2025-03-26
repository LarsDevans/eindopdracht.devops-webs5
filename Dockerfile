# --- Build Stage ---
FROM node:23-alpine AS builder
WORKDIR /usr/src/app

ARG SERVICE

COPY package*.json ./
RUN npm install

COPY . .
RUN npx nest build ${SERVICE}

# --- Runtime Stage ---
FROM node:23-alpine
WORKDIR /usr/src/app

ARG SERVICE
ENV SERVICE=${SERVICE}

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD node dist/apps/${SERVICE}/main.js
