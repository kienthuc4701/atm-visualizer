# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Run your app
CMD ["npm", "start"]