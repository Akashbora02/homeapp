# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy only package.json first (faster rebuilds)
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Build React app (output: build/)
RUN npm run build

# Stage 2: Serve via NGINX
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
