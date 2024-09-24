# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the built app from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
