# Backend Dockerfile
FROM node:18-alpine

WORKDIR /src

COPY package.json  ./
RUN npm install 

RUN npm add sequelize-cli --global

COPY . .

RUN npm run build

EXPOSE 3001


CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start:prod"]
