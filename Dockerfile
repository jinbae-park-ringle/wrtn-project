FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]