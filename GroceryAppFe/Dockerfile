# Use official Node.js LTS image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight server to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
