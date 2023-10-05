/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('issues').del()
  await knex('issues').insert([
    { title: 'issue 1', description: 'desc 1' },
    { title: 'issue 2', description: 'desc 2' },
    { title: 'issue 3', description: 'desc 3' }
  ])
}
