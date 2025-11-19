FROM node:25-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 6969

ENV NODE_ENV=production
ENV PORT=6969

# Start the application
CMD ["node", "server.cjs"]