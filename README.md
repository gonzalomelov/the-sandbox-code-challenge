## Description

REST API built using [Nest](https://github.com/nestjs/nest) framework.

Technology Stack:
* NodeJS
* TypeScript
* NestJS
* Express
* Sequelize + MySQL + phpMyAdmin
* Passport
* Docker
* AWS ECS
* Postman env vars (Partial)

Todo:
* Tests - Jest
* Seed data
* Open API
* DB versioning
* Docker ignore
* Postman Automated Tests
* Improve Readme

## Try it now!
1. Import Postman collection
2. Import Postman AWS ECS environment
3. Verify http://54.188.213.211/api/v1 replies with "Hello World!'
4. Start testing the API's methods
5. (Optional) Let me know if you need to access the DB web admin in order to check the it directly

## Deploy in local Docker Host

```bash
$ mv .env.docker .env
$ docker-compose up -d --build nest-project
```
## Apps (local env)

* REST API: http://localhost:3000/api/v1
* phpMyAdmin: http://localhost:8080/index.php

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```