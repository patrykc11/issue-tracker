'use strict'
const issueService = require('../services/issue')
const handleError = require('../utils/handleError')

const getById = async (req, res, next) => {
  try {
    const issue = await issueService.getIssueById(req.params.id)
    if (!issue) {
      handleError(`Issue with id ${req.params.id} does not exist`, 404)
    }

    res.status(200).json(issue)
  } catch (err) {
    next(err)
  }
}

const getIssueHistory = async (req, res, next) => {
  try {
    const issue = await issueService.getIssueHistory(req.params.id)
    if (!issue) {
      handleError(`Issue with id ${req.params.id} does not exist`, 404)
    }

    res.status(200).json(issue)
  } catch (err) {
    next(err)
  }
}

const getAll = async (_req, res, next) => {
  try {
    const issues = await issueService.getAllIssues()
    if (!issues) handleError('Issues do not exist', 404)

    res.status(200).json(issues)
  } catch (err) {
    next(err)
  }
}

const getAllWithStatus = async (req, res, next) => {
  try {
    const issues = await issueService.getAllWithStatus(req.params.status)
    if (!issues) {
      handleError(`Issues with status ${req.params.status} do not exist`, 404)
    }

    res.status(200).json(issues)
  } catch (err) {
    next(err)
  }
}

const addIssue = async (req, res, next) => {
  try {
    res.status(201).json(await issueService.createIssue(req.body))
  } catch (err) {
    next(err)
  }
}

const changeStatus = async (req, res, next) => {
  try {
    const changedIssue = await issueService.updateIssueStatus(
      req.params.id,
      req.body.status
    )
    if (!changedIssue) {
      handleError(`Issue with id ${req.params.id} does not exist or forbidden status`, 404)
    }

    res.status(200).json(changedIssue)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getById,
  getIssueHistory,
  getAll,
  getAllWithStatus,
  addIssue,
  changeStatus
}
