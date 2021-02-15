FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./build ./

EXPOSE 22222

ENV DBHOST localhost:27017
ENV DBUSER admin
ENV DBPASS admin

CMD ["node", "server.js"]