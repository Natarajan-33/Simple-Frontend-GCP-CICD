# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage with serve
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist .

# Cloud Run expects the app to listen on $PORT
ENV PORT 8080

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]
