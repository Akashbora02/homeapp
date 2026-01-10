# GroceryAppBe and TodosBe Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g pm2

# Copy all code
COPY . .

EXPOSE 5000

CMD ["pm2-runtime", "server.js"]
