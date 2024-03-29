# check nextjs deployment guide for more complex deployment strategy
FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /react-meme-maker

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /react-meme-maker
COPY --from=deps /react-meme-maker/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env .env
RUN npm build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /react-meme-maker
ENV NODE_ENV=production

# if needed for more tight control over user
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -u 1001 -S nextjs
# USER nextjs


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# if you are running project on standalone mode of nextjs
# COPY --from=builder --chown=nextjs:nodejs /react-meme-maker/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /react-meme-maker/.next/static ./.next/static

COPY --from=builder /react-meme-maker/node_modules ./node_modules
COPY --from=builder /react-meme-maker/public ./public
COPY --from=builder /react-meme-maker/.next ./.next

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

# CMD ["node", "server.js"]
CMD ["npm", "start"]