FROM node:16-alpine3.14

WORKDIR /app

# ENV BASENAME=/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]