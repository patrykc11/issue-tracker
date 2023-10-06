/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('issues').del()
  await knex('issues').insert([
    { title: 'issue 1', description: 'desc 1', priority: 'low' },
    { title: 'issue 2', description: 'desc 2', priority: 'medium' },
    { title: 'issue 3', description: 'desc 3', priority: 'high' }
  ])
}
