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

instance setup

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
