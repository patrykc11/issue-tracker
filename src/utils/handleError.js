'use strict'

module.exports = function handleError(message, httpCode = 400) {
  const error = new Error(message)
  error.statusCode = httpCode
  throw error
}
