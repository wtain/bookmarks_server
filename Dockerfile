# syntax=docker/dockerfile:1

# https://mherman.org/blog/dockerizing-a-react-app/

FROM node:18.7.0-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# Downgrade to 4.0.3 as suggested here:
# https://github.com/facebook/create-react-app/issues/11879
# in order to make watch mode work again
RUN npm install react-scripts@4.0.3 -g --silent
RUN npm install axios
RUN npm install @types/axios
# RUN npm run build

# add app
COPY . ./

# Debug container
# ENTRYPOINT ["tail", "-f", "/dev/null"]

EXPOSE 8080

CMD [ "node", "build/src/index.js" ]