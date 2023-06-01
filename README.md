Ride-sharing REST API  for Node.js Express API in Typescript with jsonwebtoken, joi, Knex, and Objection.js

## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
$ git clone git@github.com:ong-gtp/ride-share.git <application-name>

$ cd <application-name>

$ cp .env.example .env # Update database credentials

$ npm install mysql --save # required mysql driver for Knex

$ yarn install

$ yarn migrate
```

Load fake data in database.

```bash
$ yarn load:fake User 10 && yarn load:fake Ride 10
```

Start the application.

```bash
$ yarn start # For development

$ yarn build # For production
```


**Using Docker (OPTIONAL)**

Make a copy of `.env.docker` and save as `.env`.

```bash
$ cp .env.docker .env
```

Install dependencies and run the application locally.

```bash
$ docker compose up -d postgres

$ docker compose up -d api

$ docker compose exec api sh yarn migrate # Make sure server is started checking logs before running this command
```

View logs of the container.

```bash
$ docker compose logs -f
```

To stop the services.

```bash
$ docker compose stop api postgres
```

## Generating Migrations and Seeds

To create migration use `make:migration` and seed use `make:seeder`:

```bash
$ yarn make:migration create_{table_name}_table

$ yarn make:seeder {table_name}_table_seeder
```

Example,

```bash
$ yarn make:migration create_posts_table

$ yarn make:seeder post_table_seeder
```

Modify migration and seeder file as per the requirement. Then finally:

```bash
$ yarn migrate # to migrate

$ yarn seed # to seed
```

## Setting up REST Client (OPTIONAL)

First install Rest Client from vscode extensions

Create a file or add following lines in `.vscode` > `settings.json` and switch an environment `Cmd/Ctrl + Shift + P` > `REST Client: Switch Environment`. Then, you can request APIs from `api.rest` file.

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "refreshToken": "foo",
      "accessToken": "bar",
      "email": "sgr.raee@gmail.com",
      "password": "secret" 
    },
    "local": {
      "host": "localhost",
      "refreshToken": "{{$shared refreshToken}}",
      "accessToken": "{{$shared accessToken}}",
      "email": "{{$shared email}}",
      "password": "{{$shared password}}"
    }
  }
}
```

## License

ride-share is under [MIT License](LICENSE).
