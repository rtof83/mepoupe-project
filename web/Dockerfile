FROM node:16

WORKDIR /app/mepoupe-web

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
