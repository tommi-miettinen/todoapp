FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run compile

ENV ENV=heroku

CMD node ./build/server.js --bind 0.0.0.0:$PORT