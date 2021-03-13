# keep in root dir
# build app with tagged app name via: "docker build -t piki ."
# run app with tagged app name via: docker run piki
# however, app will not work unless call `docker-compose up`
# because it needs the DB
# and that container requires `docker-compose` to get made

# development image is first of multi-stage
FROM node:12.13-alpine as development

# run all comands in WORKDIR
# first we copy packages only so that npm install only re-runs on updates to packages
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .

# app built in /dist dir
# app uses build time dependencies like TypeScript
# thus, must execute this command in development image)
RUN npm run build

# this is a new image separate from development
FROM node:12.13-alpine as production
# env for node during build, default to production if not passed otherwise
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

#only install production dependencies for production build
WORKDIR /usr/src/app
COPY package*.json ./
# below line for EC2 bucket
RUN npm install -g rimraf @nestjs/cli
RUN npm install --only=production
COPY . .
# copy only the /dist dir from the development image
# so we don't copy devDependencies
COPY --from=development /usr/src/app/dist ./dist
# default command to execute when the image is run
CMD ["node", "dist/main"]
