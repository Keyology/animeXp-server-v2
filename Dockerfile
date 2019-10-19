FROM node:10-

WORKDIR /app

COPY package.json /app

RUN npm instal 

COPY . /app

CMD npm start 