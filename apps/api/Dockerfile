FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /workspace

COPY package.json ./package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN npm install --omit=dev

COPY apps/api/src ./apps/api/src
WORKDIR /workspace/apps/api

USER node
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@glasshouse/api"]
