# Use official Node.js image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Expose a port (should match your app)
EXPOSE 5002

# Start the app
CMD ["node", "server.js"]
