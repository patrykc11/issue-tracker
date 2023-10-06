const Model = require('objection').Model
const knex = require('../configs/database')

Model.knex(knex)

class IssueHistory extends Model {
  static get tableName() {
    return 'issue-history'
  }

  static getIssueHistory(issueId) {
    return this.query().where({ issueId })
  }
}

module.exports = IssueHistory
