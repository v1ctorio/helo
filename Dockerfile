FROM node:25-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This prevents re-installing dependencies if only code changes
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 6969

# Define environment variables (defaults)
# You should override SLACK secrets in your docker run command or .env file
ENV NODE_ENV=production
ENV PORT=6969

# Start the application
CMD ["node", "index.js"]