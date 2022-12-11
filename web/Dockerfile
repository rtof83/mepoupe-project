FROM node:16

WORKDIR /app/coin-converter-web

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
