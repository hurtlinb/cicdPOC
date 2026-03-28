FROM node:20.12.2-alpine3.19

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev

COPY server.js ./

USER node

EXPOSE 3000

CMD ["npm", "start"]
