FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update \
    && apk upgrade \
    && apk add python3 make gcc g++ \
    && npm install

COPY . .

CMD [ "node", "./src/bot.js" ]