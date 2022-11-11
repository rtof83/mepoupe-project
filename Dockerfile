FROM node:alpine

WORKDIR /Documentos/mepoupe-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
