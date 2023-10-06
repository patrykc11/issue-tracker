const joi = require('joi')
const joiDate = require('joi').extend(require('@joi/date'))

const validatePostIssueMiddleware = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    priority: joi.string().valid('low', 'medium', 'high'),
    deadline: joiDate.date().iso()
  })

  const validation = schema.validate(req.body)
  if (validation.error) {
    res
      .status(422)
      .json({ message: 'Invalid issue data. Please check the provided fields.' })
  }
  next()
}

const validatePatchStatusMiddleware = (req, res, next) => {
  const schema = joi.object({
    status: joi.string().valid('pending', 'close').required()
  })
  const validation = schema.validate(req.body)
  if (validation.error) {
    res
      .status(422)
      .json({
        message: 'Invalid status value. Allowed values are "pending" or "close".'
      })
  }
  next()
}

const validateIssueIdMiddleware = (req, res, next) => {
  const schema = joi.number().required()
  const validation = schema.validate(req.params.id)
  if (validation.error) {
    res
      .status(422)
      .json({
        message: 'Invalid issue id value. Allowed values are numbers.'
      })
  }
  next()
}

const validateIssueStatusMiddleware = (req, res, next) => {
  const schema = joi.string().valid('open', 'pending', 'close').required()
  const validation = schema.validate(req.params.status)
  if (validation.error) {
    res
      .status(422)
      .json({
        message: 'Invalid status value. Allowed values are "open", "pending" or "close".'
      })
  }
  next()
}

module.exports = {
  validatePostIssueMiddleware,
  validatePatchStatusMiddleware,
  validateIssueIdMiddleware,
  validateIssueStatusMiddleware
}
