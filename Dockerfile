# base image
FROM node:12.19-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @vue/cli@4.4.0 -g

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install

# start app
CMD ["yarn", "serve"]

