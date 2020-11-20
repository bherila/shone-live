## Description

TODO

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### TODO Also can run docker local

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy

### instance setup

1. EC2 instance (currently seeing if deploy works on standard t2.small after t2.micro couldn't compile the server code due to not enough memory [small is 2gb vs micro 1gb])
   (set up the security for TCP to allow any )
2. add docker on the instance
   (following https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html)
   `$sudo yum update -y`
   `$sudo amazon-linux-extras install docker`
   `$sudo yum install docker`
   `$sudo service docker start`
   `$sudo usermod -a -G docker ec2-user`
   `$docker info`
   (got permission denied, so rebooted per instructions)
   (call again)
   `$sudo service docker start`
   `$docker info`
3. copy or create the dockerfile and the docker compose prod file and .env file
   `$ touch Dockerfile`
   `$ vim Dockerfile`
   `$ touch docker-compose.prod.yml`
   `$ vim docker-compose.prod.yml`
   `$ touch .env`
   `$ vim .env`
   (paste in the values)
4. install docker compose
   (followed this instruction https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9)
   (added docker to auto start per instructions and tested that)
5. login to docker
   `$ docker login --username=brettonauerbach`
6. `$docker-compose -f docker-compose.prod.yml up -d`
7. check that the server is running
   `$ docker ps`
   (get container id)
   `$ docker logs --follow --until=3s <container-id>`
8. confirm you can register and login or hit some endpoint on the server...

### build deploy

deployment
remove all the old images
\$`docker system prune -a`
rebuild the deployment image
\$`docker build -t piki .`
tag the build with the timestamp
get image id
\$`docker images`
tag image
\$`docker tag <id> brettonauerbach/piki-server:build<egtimestamp 202011191500>`
push the build to dockerhub
\$`docker push brettonauerbach/piki-server`
ssh to AWS machine and pull the docker image
\$`ssh -i "sample-piki-app-1.pem" ec2-user@ec2-54-219-183-150.us-west-1.compute.amazonaws.com`
run the image on docker
edit the .env file
\$`BUILD_VERSION=<update here>`
run docker-compose
\$`docker-compose -f docker-compose.prod.yml up -d`
check all is running okay
get main image id
\$`docker ps`
tail the log to see it workign
\$`docker logs --follow --until=3s <eg log id 0ae11971e71d>`
