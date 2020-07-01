# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/recommend.service

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

# Expose the listening port
EXPOSE 8102

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD ["npm", "start"]