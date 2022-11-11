FROM node:alpine

WORKDIR /app/mepoupe-project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
