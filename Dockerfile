FROM node:12 as web-build

#Setting the working directory as /app
WORKDIR /app

#Copying package.json to Docker Image
COPY package.json /app
COPY package-lock.json /app
COPY src/ app/
COPY public/ app/
COPY tsconfig.json /app

#Installing all dependencies.
RUN npm ci
RUN npm run build
