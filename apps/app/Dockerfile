FROM node:20-alpine3.20 AS base

FROM base AS pnpm
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
RUN yarn global add pnpm@9.9.0 turbo@2.1.1

FROM pnpm AS builder
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM pnpm AS installer
# Set working directory
WORKDIR /app
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

ARG NEXT_PUBLIC_POSTHOG_HOST
ENV NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST
ARG NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_ENCRYPTION_KEY
ENV NEXT_PUBLIC_ENCRYPTION_KEY=$NEXT_PUBLIC_ENCRYPTION_KEY
ARG NEXT_PUBLIC_NOVU_APP_IDENTIFIER
ENV NEXT_PUBLIC_NOVU_APP_IDENTIFIER=$NEXT_PUBLIC_NOVU_APP_IDENTIFIER

# Build the project
COPY --from=builder /app/out/full/ .
RUN turbo build --filter=app

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/static ./apps/app/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/public ./apps/app/public

CMD node apps/app/server.js
