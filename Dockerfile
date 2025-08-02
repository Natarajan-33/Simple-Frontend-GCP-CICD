# Stage 1: Build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve built files
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist .
CMD ["serve", "-s", ".", "-l", "8080"]
