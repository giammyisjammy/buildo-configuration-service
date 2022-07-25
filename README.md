<p align="center">
  <a href="http://buildo.io/" target="blank"><img src="company-logo.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Configuration service built using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Make sure you have [set up a local installation of MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/). Then do the following:

- in MySQL Workbench, create the database:

  ```SQL
  CREATE DATABASE dev; -- for development
  CREATE DATABASE test; -- for e2e
  ```

- in project directory, install dependencies:

  ```bash
  $ yarn install
  ```

- in project directory, create your `.env` and `.env.test` files like the one in `.env.example`

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Other possible improvements

- Add OpenAPI documentation with Swagger integration [read more here](https://docs.nestjs.com/openapi/introduction#installation).
- Containerize the database in a Docker image [read more here](https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/docker-compose.yml).

## Stay in touch

- Author - [Gianmarco Bado](https://github.com/giammyisjammy)

## License

Nest is [MIT licensed](LICENSE).
