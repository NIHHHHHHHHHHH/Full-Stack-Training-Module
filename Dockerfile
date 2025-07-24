
# Dockerfile (at the root of TRAINING-MODULE/)

# Stage 1: Build the React application
# Use a Node.js LTS Alpine image for a smaller base
FROM node:lts-alpine as build-stage

# Set the working directory inside the container
WORKDIR /app

# Declare the build argument for REACT_APP_API_URL
# This ARG will receive its value from the Cloud Build trigger (via --build-arg)
ARG REACT_APP_API_URL

# Set the environment variable inside the container.
# Create React App's build process (npm run build) will pick this up
# and embed its value directly into your JavaScript bundle.
# The value comes from the ARG declared above.
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package.json and package-lock.json from the 'client' directory
# to the current working directory in the container.
# Using client/package*.json ensures both package.json and package-lock.json are copied.
COPY client/package*.json ./

# Install frontend dependencies.
# --omit=dev ensures devDependencies are not installed in the final production build,
# resulting in a smaller node_modules and faster build.
RUN npm install --omit=dev

# Copy all frontend source files from the 'client' directory
# to the current working directory in the container.
# This includes public/, src/, etc.
COPY client/. .

# Build the React application for production.
# This command generates the optimized static files in the 'build' folder.
RUN npm run build

# Stage 2: Serve the React application with Nginx
# Use a lightweight Nginx Alpine image
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file
# This file defines how Nginx serves your React app (static files, React Router fallback).
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the 'build-stage'
# to Nginx's default serving directory.
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 8080, as configured in your nginx.conf and expected by Cloud Run
EXPOSE 8080

# Command to start Nginx in the foreground.
# 'daemon off;' is crucial for Docker containers, as the main process must stay in the foreground.
CMD ["nginx", "-g", "daemon off;"]
