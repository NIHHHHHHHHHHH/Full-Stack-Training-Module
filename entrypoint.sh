#!/bin/sh

# List all REACT_APP_ variables you expect from Cloud Run
# Use the exact variable names that you will set in Cloud Run
REACT_APP_VARS_TO_SUBST='${REACT_APP_API_URL},${REACT_APP_ANOTHER_VARIABLE}'

# Substitute environment variables into the template and output to the final file
# This file will be served by Nginx and read by your React app.
envsubst "$REACT_APP_VARS_TO_SUBST" < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js

# Start Nginx in the foreground
exec nginx -g 'daemon off;'