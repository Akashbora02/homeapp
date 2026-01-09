FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["pm2-runtime", "serve", "--name", "todos-frontend", "--", "-s", "build", "-l", "3001"]

