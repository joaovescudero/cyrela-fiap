FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000
