# Use the official Node.js image as the base image
FROM node:16.17.1

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . .

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]

# Exposed dockerfile this tcp port
EXPOSE 5222