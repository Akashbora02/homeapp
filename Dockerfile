FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["pm2-runtime", "serve", "build", "3002", "--name", "frontend-app" "--spa"]