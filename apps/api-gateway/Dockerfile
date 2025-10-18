FROM node:lts-alpine AS base


FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api-gateway --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN npx turbo run build --filter=api-gateway

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 appuser
RUN adduser --system --uid 1001 appuser
USER appuser
COPY --from=installer /app .

CMD ["node","apps/api-gateway/dist/main.js","--","--host 0.0.0.0"]