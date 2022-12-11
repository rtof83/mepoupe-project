FROM node:alpine

WORKDIR /app/mepoupe-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
