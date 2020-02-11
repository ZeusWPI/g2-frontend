FROM node:lts-alpine

# Install simple http server for serving static content
RUN npm install -g http-server
RUN npm install yarn -g

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
COPY yarn.lock ./


# Install project dependencies
RUN yarn install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]
