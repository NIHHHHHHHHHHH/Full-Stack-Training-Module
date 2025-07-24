# Dockerfile (at the root of TRAINING-MODULE/)

# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app

# Declare the build argument for REACT_APP_API_URL
# This is how Cloud Build will pass the value from its substitution variable
# We're naming it REACT_APP_API_URL here for direct use below
ARG REACT_APP_API_URL

# Set the environment variable inside the container for Create React App
# This makes process.env.REACT_APP_API_URL available during npm run build
# The value is taken from the ARG passed in (which comes from Cloud Build's substitution)
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package.json and package-lock.json from the client directory
COPY client/package*.json ./
# Install frontend dependencies
RUN npm install --omit=dev
# Copy all frontend source files from the client directory
COPY client/. .
# Build the React application for production
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]