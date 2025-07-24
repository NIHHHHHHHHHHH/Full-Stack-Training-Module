# TRAINING-MODULE/client/Dockerfile
# This Dockerfile is now located inside the 'client/' directory.

# Stage 1: Build the React application
FROM node:lts-alpine as build-stage

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# IMPORTANT CHANGES FOR COPY COMMANDS:
# Paths are now relative to the 'client/' directory (where this Dockerfile resides).
# So, 'client/package*.json' becomes 'package*.json', 'client/.' becomes '.', etc.

# Copy package.json and package-lock.json from the 'client/' directory itself
# to the current working directory (/app) in the container.
COPY package*.json ./

RUN npm install --omit=dev

# Copy all frontend source files from the 'client/' directory itself
# to the current working directory (/app) in the container.
COPY . . # This now copies 'src/', 'public/', etc. directly from 'client/'

RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file from 'client/nginx/'
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]