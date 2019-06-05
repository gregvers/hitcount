# Dockerfile to run hitcount
# connects to a MongoDB with ENV variables MONGODB_SERVICE_HOST and MONGODB_SERVICE_PORT

FROM node
WORKDIR /node/hitcount
RUN npm install -g express
COPY . ./
RUN npm install

ENV MONGODB_SERVICE_HOST=localhost
ENV MONGODB_SERVICE_PORT=27017

EXPOSE 3000
ENTRYPOINT npm start
