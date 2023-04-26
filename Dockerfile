FROM node:14-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm install --production
COPY tsconfig.json .
RUN npm run build
COPY ./dist ./dist

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]