# Stage 1: Build the React app
FROM node:20 AS build

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using a lightweight web server
FROM nginx:alpine AS production

# Update the package list and install Nginx
RUN apk update && apk upgrade

# Copy the build output from the previous stage
COPY --from=build /build /usr/share/nginx/html/releaseMaturity/

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]