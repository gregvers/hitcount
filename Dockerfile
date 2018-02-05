# Dockerfile to run hitcount
# connects to a MongoDB with ENV variables MONGODB_SERVICE_HOST and MONGODB_SERVICE_PORT
FROM node

# RUN apt-get update && apt-get -y install vim

RUN mkdir -p /node/hitcount
WORKDIR /node/hitcount
RUN npm install -g express
COPY . /node/hitcount/
RUN npm install

ENV MONGODB_SERVICE_HOST=localhost
ENV MONGODB_SERVICE_PORT=27017

EXPOSE 3000
ENTRYPOINT npm start
