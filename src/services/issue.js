'use strict'
const issueModel = require('../models/issue')
const issueHistoryModel = require('../models/issueHistory')

const getIssueById = async (id) => {
  return issueModel.getById(id) || {}
}

const getAllIssues = async (id) => {
  return issueModel.getAll() || []
}

const getIssueHistory = async (id) => {
  return issueHistoryModel.getIssueHistory(id) || []
}

const getIssuesWithStatus = async (status) => {
  return issueModel.getByStatus(status) || []
}

const createIssue = async (issue) => {
  return issueModel.createIssue(issue) || {}
}

const updateIssueStatus = async (id, status) => {
  return issueModel.updateStatus(id, status) || {}
}

module.exports = {
  getIssueById,
  getAllIssues,
  getIssueHistory,
  getIssuesWithStatus,
  createIssue,
  updateIssueStatus
}
