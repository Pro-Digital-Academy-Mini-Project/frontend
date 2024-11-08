# 1. Using the node image as the base image
FROM node:18 as build

# 3. Set the working directory inside the container
WORKDIR /app
 
# work dir 에 dist 폴더 생성 /app/dist
RUN mkdir ./dist
 
# host pc의 현재경로의 dist 폴더를 workdir 의 dist 폴더로 복사
ADD ./dist ./dist

# 4. Copy the package.json and package-lock.json (or pnpm-lock.yaml) to the working directory
COPY package*.json ./

RUN npm install

# 6. Copy the rest of the source code to the container's working directory
COPY . .

# 환경 변수 설정
ARG VITE_BACK_URL
ENV VITE_BACK_URL=${VITE_BACK_URL}
ARG VITE_PUBLIC_URL
ENV VITE_PUBLIC_URL=${VITE_PUBLIC_URL}

RUN npm run build

# Use the official Nginx base image
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will listen on
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]