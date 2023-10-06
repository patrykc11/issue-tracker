'use strict'
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Issue Tracker',
      version: '1.0.0',
      description: 'Issue Tracker is a interview project'
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
