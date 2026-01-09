# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g pm2

# Copy app code
COPY . .

# Build React app
RUN npm run build

# Expose port
EXPOSE 3000

# Serve the build folder using PM2
# NOTE: replace 3000 with the port via docker-compose if needed
CMD ["pm2-runtime", "serve", "build/", "3000", "--name", "frontend-app", "--spa"]
