FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /workspace

COPY package.json ./package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN npm install

COPY apps/web ./apps/web
WORKDIR /workspace/apps/web

USER node
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
