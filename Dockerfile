# Use the official Node.js image as the base image
FROM node:23-alpine3.19 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React TypeScript application
RUN npm run build



FROM nginx:stable-alpine

COPY --from=Build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["nginx", "-g", "daemon off;"]