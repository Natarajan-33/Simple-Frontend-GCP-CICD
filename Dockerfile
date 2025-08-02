# Stage 1: Build the frontend
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the built files
FROM node:18-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]
