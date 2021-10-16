<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Create New Model

### Post Module

Run `$ nest g module /modules/posts `
This will automatically add this module to our root module AppModule.

### Generate Post Service

Run `$ nest g service /modules/posts `
This will automatically add this service to the Post module.

### Generate Post Controller

Run `$ nest g co /modules/posts `
This will automatically add this controller to the Post module.

### Post Entity

Create a post.entity.ts file inside the posts folder.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# make up docker
$ docker-compose -f docker-compose.development.yml up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
