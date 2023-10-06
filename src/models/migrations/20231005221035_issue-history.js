/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable('issueHistory', (table) => {
    table.increments('id').primary()
    table.integer('issueId').references('issues.id').onDelete('CASCADE')
    table.string('status')
    table.dateTime('updatedAt')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('issueHistory')
}
