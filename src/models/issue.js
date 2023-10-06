const Model = require('objection').Model
const knex = require('../configs/database')

Model.knex(knex)

class Issue extends Model {
  static get tableName() {
    return 'issues'
  }

  static getAll() {
    return this.query()
  }

  static getById(id) {
    return this.query().findById(id)
  }

  static getByStatus(status) {
    return this.query().where({ status })
  }

  static getByPriority(priority) {
    return this.query().where({ priority })
  }

  static async updateStatus(id, status) {
    try {
      return await this.query()
        .findById(id)
        .patch({
          status,
          updatedAt: knex.fn.now()
        })
        .returning('*')
    } catch (err) {
      return {}
    }
  }

  static async createIssue(issue) {
    try {
      return await this.query()
        .insert({
          title: issue.title,
          description: issue.description,
          priority: issue.priority,
          deadline: issue.deadline
        })
        .skipUndefined()
    } catch (err) {
      return {}
    }
  }
}

module.exports = Issue
