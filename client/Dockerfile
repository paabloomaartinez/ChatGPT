# node 18 as image base
FROM node:18

# make the 'app/client' folder the current working directory
WORKDIR /app/client

# copy both 'package.json' and 'package-lock.json'
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to 'client' folder
COPY . .

# listening port
EXPOSE 8080

# start the server in the background
CMD ["npm", "run", "serve"]