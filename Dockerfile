FROM node:16
ENV DATABASE mongodb://host.docker.internal:27017
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./build .
EXPOSE 8080
CMD [ "node", "src/index.js" ]