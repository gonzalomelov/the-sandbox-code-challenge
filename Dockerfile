FROM node:14-alpine AS builder
# FROM --platform=linux/amd64 node:14-alpine AS builder
RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*
WORKDIR "/app"
COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production
FROM node:14-alpine AS production
# FROM --platform=linux/amd64 node:14-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/wait-for ./wait-for
RUN chmod +x ./wait-for
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["sh", "-c", "./wait-for db:3306 -t 80 -- npm run start:prod"]