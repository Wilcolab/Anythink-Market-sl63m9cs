FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json only (do not require yarn.lock)
COPY package.json ./

# Install dependencies
RUN yarn install --network-timeout 100000

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
CMD ["yarn", "start"]