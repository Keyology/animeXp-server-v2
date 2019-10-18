FROM node:10-slim
# install a light version of node.js 

WORKDIR /app

#create a directory named app to hold project 

COPY package.json /app

# copy package.json to app directory 

COPY . /app

RUN npm install

# install dependicies 

COPY . /app

# copy rest of the application to the app directory 

CMD npm start

#run command to start application

EXPOSE 7000

EXPOSE 27017
