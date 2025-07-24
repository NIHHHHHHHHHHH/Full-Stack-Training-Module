# # Stage 1: Build the React application
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# # Now, package.json is in client/ so specify the path
# COPY client/package*.json ./
# RUN npm install
# # Now, React app source is in client/ so specify the path
# COPY client/. .
# RUN npm run build

# # Stage 2: Serve the React application with Nginx
# FROM nginx:alpine
# RUN rm /etc/nginx/conf.d/default.conf
# # Now, nginx folder is in client/ so specify the path
# COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# # The build output is still in /app/build from stage 1, so this line is fine
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app

# Copy package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the entire client directory (your React source)
COPY client/. .

# Build the React application
# This step will build the app assuming dynamic env variables will be loaded at runtime
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Install gettext-runtime for envsubst
RUN apk update && apk add --no-cache gettext

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the build-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy the env-config.js.template (from client/public)
COPY client/public/env-config.js.template /usr/share/nginx/html/env-config.js.template

# Copy the custom entrypoint script and make it executable
COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose the port Nginx is listening on
EXPOSE 8080

# Set the entrypoint to your custom script
CMD ["/docker-entrypoint.sh"]