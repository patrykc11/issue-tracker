'use strict'
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, 'src', 'configs', '.env')
})
const express = require('express')
const app = express()
const port = process.env.PORT
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./src/utils/logger')

const user = require('./src/routes/user')
const issue = require('./src/routes/issue')

app.use(helmet())
app.use(express.json())
app.use(cors())

// if (['development', 'dev', 'develop', 'test'].includes(process.env.NODE_ENV)) {
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// }

app.use('/user', user)
app.use('/issue', issue)

app.use((err, _req, res) => {
  const errStatus = err.statusCode || 500
  const errMsg = err.message || 'INTERNAL SERVER ERROR'
  logger.error(`${errStatus} - ${errMsg} - ${err.stack}`)

  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
})

app.listen(port, (err) => {
  if (!err) logger.info('Server is running on port ' + port)
  else logger.error('Error occurred: ', JSON.stringify(err))
})
