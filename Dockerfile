# Stage 1: Build the React application
FROM node:lts-alpine as build-stage
WORKDIR /app
# Now, package.json is in client/ so specify the path
COPY client/package*.json ./
RUN npm install
# Now, React app source is in client/ so specify the path
COPY client/. .

# Accept build arguments and set as environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_OTHER_VAR
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_OTHER_VAR=$REACT_APP_OTHER_VAR


RUN npm run build



# Stage 2: Serve the React application with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
# Now, nginx folder is in client/ so specify the path
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# The build output is still in /app/build from stage 1, so this line is fine
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]