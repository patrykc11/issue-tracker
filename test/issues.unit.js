const { expect } = require('chai')
const { describe, it, before } = require('mocha')
process.env.NODE_ENV = 'test'
const knex = require('../src/configs/database')
const Issue = require('../src/models/issue')
const IssueHistory = require('../src/models/issueHistory')

describe('Issue model tests', () => {
  before(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  after(async () => {
    await knex.destroy()
  })

  let testIssueId = 0
  it('should get all issues', async () => {
    const issues = await Issue.getAll()
    expect(issues).to.be.an('array')
    testIssueId = issues[0].id
  })

  it('should get issue by id', async () => {
    const issue = await Issue.getById(testIssueId)
    expect(issue).to.be.an('object')
    expect(issue.id).to.equal(testIssueId)
  })

  it('should get issues by status', async () => {
    const status = 'open'
    const issues = await Issue.getByStatus(status)
    expect(issues).to.be.an('array')
    issues.forEach((issue) => {
      expect(issue.status).to.equal(status)
    })
  })

  it('should get issues by priority', async () => {
    const priority = 'low'
    const issues = await Issue.getByPriority(priority)
    expect(issues).to.be.an('array')
    issues.forEach((issue) => {
      expect(issue.priority).to.equal(priority)
    })
  })

  it('should update issue status', async () => {
    const newStatus = 'pending'
    const updatedIssue = await Issue.updateStatus(testIssueId, newStatus)
    expect(updatedIssue).to.be.an('object')
    expect(updatedIssue.status).to.equal(newStatus)
  })

  it('should create new issue', async () => {
    const newIssue = {
      title: 'New Issue',
      description: 'Description of the new issue',
      priority: 'medium',
      deadline: new Date()
    }
    const createdIssue = await Issue.createIssue(newIssue)
    expect(createdIssue).to.be.an('object')
    expect(createdIssue.title).to.equal(newIssue.title)
  })

  it('should get issue history by issueId', async () => {
    const history = await IssueHistory.getIssueHistory(testIssueId)
    expect(history).to.be.an('array')
    history.forEach((record) => {
      expect(record.issueId).to.equal(testIssueId)
    })
  })
})
