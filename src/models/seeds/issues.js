/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('issues').del()
  await knex('issues').insert([
    { title: 'issue 1', description: 'desc', reportedBy: 1 }
  ])
}
