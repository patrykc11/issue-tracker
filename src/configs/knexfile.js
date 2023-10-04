const { knexSnakeCaseMappers } = require('objection')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, 'src', 'configs', '.env')
})

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    },
    migrations: {
      tableName: 'migrations',
      directory: '../models/migrations'
    },
    seeds: {
      directory: '../models/seeds'
    },
    ...knexSnakeCaseMappers()
  },
}
