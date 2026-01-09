FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g pm2

EXPOSE 3002

CMD ["pm2-runtime", "serve", "build", "3002", "--name", "homeapp-frontend", "--spa"]
