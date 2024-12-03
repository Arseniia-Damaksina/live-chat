# development
FROM node:18 AS development

WORKDIR /live-chat_be/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000