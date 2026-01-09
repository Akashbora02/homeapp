# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g pm2

# Copy all files
COPY . .

# Expose port (we can use .env PORT)
EXPOSE 5000

# Start backend with PM2
CMD ["pm2-runtime", "server.js", "--name", "todos-backend"]
