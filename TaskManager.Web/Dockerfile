# Use a Node.js image to build the Angular application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application in production mode
RUN npm run build -- --output-path=./dist/task-manager-web --configuration production

# Use a lightweight Nginx image to serve the built application
FROM nginx:alpine

# Remove default nginx index.html
RUN rm /usr/share/nginx/html/index.html

# Copy the Nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application from the build stage
COPY --from=build /app/dist/task-manager-web/browser /usr/share/nginx/html

# Set proper ownership and permissions for Nginx to serve files
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80 