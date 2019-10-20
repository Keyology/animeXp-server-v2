FROM node:10-slim 

LABEL Author="keonimurray45@gmail.com"

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm start 