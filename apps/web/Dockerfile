FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /workspace

COPY package.json ./package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
RUN npm install

COPY --chown=node:node apps/web ./apps/web
# Vite writes its config bundle and cache while running as the non-root user.
RUN chown -R node:node /workspace/node_modules
WORKDIR /workspace/apps/web

USER node
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--port", "5173"]
