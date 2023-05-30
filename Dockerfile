## node app
FROM node:18

LABEL authors="abobakr"

WORKDIR /nest-apps

COPY tsconfig.json ./
COPY package*.json ./

RUN npm install

COPY src/  src/
COPY .env ./

RUN npm run build

# RUN mkdir -p /data/db

# CMD ["mongod"]

EXPOSE 5000
#
CMD [ "npm","start" ]
#


# # Client App
# FROM johnpapa/angular-cli as client-app
# LABEL authors="John Papa"
# WORKDIR /usr/src/app
# COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install --silent
# COPY . .
# RUN ng build --prod

# # Node server
# FROM node:12-alpine as node-server
# WORKDIR /usr/src/app
# COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY server.js .
# COPY /server /usr/src/app/server

# # Final image
# FROM node:12-alpine
# WORKDIR /usr/src/app
# COPY --from=node-server /usr/src /usr/src
# COPY --from=client-app /usr/src/app/dist ./
# EXPOSE 3000
# # CMD ["node", "server.js"]
# CMD ["npm", "start"]
