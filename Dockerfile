FROM node:alpine

WORKDIR /Documentos/mepoupe-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
