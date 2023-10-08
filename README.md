# issue-tracker
Simple issue tracker example

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Table of Contents

1. [Installation](#installation)
2. [Tech](#tech)
3. [Database](#database)

### Installation

---

Project needs node.js version 18.0.0 Tested on npm version 8.18.0.

```
$ git clone clone https://github.com/patryc11/issue-tracker.git
$ cd ../path/to/project
$ npm install
$ npm install
$ npm run start
```

In `src/configs/.env`.This is how an example `/.env` file looks like:

```
PORT=3000
NODE_ENV=development
DB_NAME=issue-tracker
DB_USER=postgres
DB_PASSWORD=xyz
DB_HOST=34.116.140.160
DB_PORT=5432
TEST_DB_NAME=issue-tracker-test
```

Endpoints documentation in _host:port/docs_.

### Tech

---
Issue tracker uses a number of open source projects to work properly:

- [node.js](https://nodejs.org/en/docs/) - I/O for the backend
- [Express](https://expressjs.com/en/4x/api.html) - fast node.js network app framework
- [Swagger](https://swagger.io/tools/swagger-ui/) - documentation

### Database

---

Project uses PostgreSQL database. To create new database is necessary to create `src/configs/.env` with database credentials. Next create migrations `src/models/migrations/`:

```
$ npx knex migrate:up <filename>.js
```

Initial seeding of database with data `src/models/seeds/`:

```
$ npx knex seed:run
```

### Run the app

---

Run server:

```
$ npm run start


Frontend address: `http://address:port/


### Tests

---

Tests for services use chai-http. Run test with:

```
$ npm run test
```
### Contact

---

Patryk Cebo, patrykcebo11@gmail.com
