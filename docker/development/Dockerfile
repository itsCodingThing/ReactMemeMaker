FROM node:20-alpine AS base

WORKDIR /react-meme-maker
ENV NODE_ENV=development

EXPOSE 3000
COPY . .

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["npm", "run", "dev"]