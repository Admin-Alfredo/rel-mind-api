FROM node:18.20.1

WORKDIR /usr/src/sg-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

