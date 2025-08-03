# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install the lightweight static file server
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=build /app/dist .

# Set the default port for Cloud Run compatibility
ENV PORT 8080

EXPOSE ${PORT}

# Echo the port and start the server on the Cloud Run assigned port
CMD echo "Starting frontend on port ${PORT}" && serve -s . -l ${PORT}
