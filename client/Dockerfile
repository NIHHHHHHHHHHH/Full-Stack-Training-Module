# TRAINING-MODULE/client/Dockerfile
# This Dockerfile is now located inside the 'client/' directory.

# Stage 1: Build the React application
FROM node:lts-alpine as build-stage

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./

RUN npm install --omit=dev

# === MODIFIED SECTION ===
# Explicitly copy specific directories instead of a blanket COPY . .
COPY src/ ./src/
COPY public/ ./public/
# If you have other top-level files like 'README.md' or similar that are needed
# and are in 'client/', you might need to add them here too:
# COPY README.md ./
# ========================

RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]