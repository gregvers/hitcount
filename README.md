# HitCount
nodejs app that count page hits and store it in a mongo database

BUILD:
docker build -t gregvers/hitcount .

RUN:
docker run -d --name mongodb -p 27017:27017 mongo
docker run -it -p 3000:3000 -e MONGODB_SERVICE_HOST='172.17.0.2' -e MONGODB_SERVICE_PORT='27017' --link a385ca34d0fb:mongodb gregvers/hitcount
