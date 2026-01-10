# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies and PM2
RUN npm install && npm install -g pm2

# Copy application source code
COPY . .

# Build the frontend (creates build/)
RUN npm run build

# Expose frontend port
EXPOSE 3002

# Serve build folder using PM2
CMD ["pm2-runtime", "serve", "build", "3002", "--name", "homeapp-frontend", "--spa"]
