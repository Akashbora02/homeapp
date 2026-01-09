# 1. Build stage
FROM node:18-alpine AS build

# Install build tools for Alpine (needed for some node modules)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Copy your .env if needed
# COPY .env .env  # Uncomment if .env is not already in repo

# Build the React app (produces /app/build)
RUN npm run build

# 2. Production stage with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build artifacts from build stage
COPY --from=build /app/src /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
