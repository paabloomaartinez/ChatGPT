# node 18 as image base
FROM node:18

# make the 'app/server' folder the current working directory
WORKDIR /app/server

# copy both 'package.json' and 'package-lock.json'
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to 'server' folder
COPY . .

# listening port
EXPOSE 5000

# run the server
CMD [ "node", "app.js" ]