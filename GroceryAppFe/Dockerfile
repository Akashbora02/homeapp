# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g pm2

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the build folder using PM2
CMD ["pm2-runtime", "serve", "build/", "3000", "--name", "grocery-frontend", "--spa"]
