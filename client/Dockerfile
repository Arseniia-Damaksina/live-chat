# development
FROM node:18 AS development

WORKDIR /live-chat_fe/src

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 4200