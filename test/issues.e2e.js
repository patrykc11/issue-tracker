const supertest = require('supertest')
const { expect } = require('chai')
process.env.NODE_ENV = 'test'
const app = require('../app')
const knex = require('../src/configs/database')

describe('End-to-End Tests', () => {
  before(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })

  let testingIssueId = 0
  it('should get all issues', async () => {
    const response = await supertest(app).get('/issue/all')
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
    testingIssueId = response.body[0].id
  })

  it('should get issue by id', async () => {
    const response = await supertest(app).get(`/issue/${testingIssueId}`)
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('object')
    expect(response.body.id).to.equal(testingIssueId)
  })

  it('should return 422 for invalid id in getById route', async () => {
    const response = await supertest(app).get('/issue/invalid-id')
    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid issue id value. Allowed values are numbers.'
    )
  })

  it('should return 404 for no existing id in getById route', async () => {
    const response = await supertest(app).get('/issue/0')
    expect(response.status).to.equal(404)
    expect(response.body.message).to.equal(
      'Issue with id 0 does not exist.'
    )
  })

  let newIssueId = 0
  it('should create a new issue', async () => {
    const newIssue = {
      title: 'New Issue',
      description: 'Description of the new issue',
      priority: 'medium',
      deadline: '2023-12-31T23:59:59Z'
    }

    const response = await supertest(app).post('/issue/').send(newIssue)

    expect(response.status).to.equal(201)
    expect(response.body).to.be.an('object')
    newIssueId = response.body.id
  })

  it('should return 422 for missing required fields in create issue route', async () => {
    const response = await supertest(app).post('/issue/').send({})

    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid issue data. Please check the provided fields.'
    )
  })

  it('should change issue status', async () => {
    const newStatus = 'close'

    const response = await supertest(app)
      .patch(`/issue/${newIssueId}/change-status`)
      .send({ status: newStatus })

    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('object')
  })

  it('should return 422 for invalid id in changeStatus route', async () => {
    const response = await supertest(app)
      .patch('/issue/invalid-id/change-status')
      .send({ status: 'close' })

    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid issue id value. Allowed values are numbers.'
    )
  })

  it('should return 422 for invalid status in update issue status route', async () => {
    const response = await supertest(app)
      .patch(`/issue/${newIssueId}/change-status`)
      .send({ status: 'invalid-status' })

    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid status value. Allowed values are "pending" or "close".'
    )
  })

  it('should return 403 for invalid id in changeStatus route', async () => {
    const response = await supertest(app)
      .patch(`/issue/${newIssueId}/change-status`)
      .send({ status: 'pending' })

    expect(response.status).to.equal(403)
    expect(response.body.message).to.equal(
      `Issue with id ${newIssueId} does not exist or forbidden status.`
    )
  })

  it('should get issue history', async () => {
    const response = await supertest(app).get(`/issue/${newIssueId}/history`)
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
  })

  it('should return 422 for invalid id in getIssueHistory route', async () => {
    const response = await supertest(app).get('/issue/invalid-id/history')
    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid issue id value. Allowed values are numbers.'
    )
  })

  it('should get all issues with a specific status', async () => {
    const status = 'open'
    const response = await supertest(app).get(`/issue/all/${status}`)
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
  })

  it('should return 422 for invalid status in getAllWithStatus route', async () => {
    const response = await supertest(app).get('/issue/all/invalid-status')
    expect(response.status).to.equal(422)
    expect(response.body.message).to.equal(
      'Invalid status value. Allowed values are "open", "pending" or "close".'
    )
  })
})
