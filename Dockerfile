# 1. Using the node image as the base image
FROM node:18 as build

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy the package.json and package-lock.json (or pnpm-lock.yaml) to the working directory
COPY package*.json ./

# 5. Install dependencies using pnpm
RUN npm install

# 6. Copy the rest of the source code to the container's working directory
COPY . .

# 7. Build your TypeScript code
RUN npm run build

# Use the official Nginx base image
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will listen on
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]