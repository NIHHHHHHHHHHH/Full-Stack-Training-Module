# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app
# IMPORTANT: Now specify 'client/' because package.json is in client/
COPY client/package*.json ./
RUN npm install
# IMPORTANT: Now specify 'client/' because your React app's source is in client/
COPY client/. .
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
# IMPORTANT: Now specify 'client/' because your nginx folder is in client/
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# This line is fine as it copies from the /app/build directory within the build-stage container
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]