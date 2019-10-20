FROM node:10-slim 

LABEL Author="keonimurray45@gmail.com"

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 7000

EXPOSE 27017

CMD node ./bin/www

