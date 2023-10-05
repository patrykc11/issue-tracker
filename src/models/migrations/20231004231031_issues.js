/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('issues', (table) => {
    table.increments('id').primary()
    table.string('title').notNull()
    table.string('description').notNull()
    table.enu('status', ['open', 'pending', 'close']).notNullable().defaultTo('open')
    table.enu('priority', ['low', 'medium', 'high']).notNullable().defaultTo('medium')
    table.dateTime('deadline')
    table.dateTime('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable()
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable()
  })

  // const triggerFunction = `
  //   CREATE OR REPLACE FUNCTION delete_old_files_function()
  //   RETURNS TRIGGER AS $$
  //   BEGIN
  //     DELETE FROM second_stream_files_locations
  //     WHERE timestamp < (EXTRACT(EPOCH FROM NOW())::bigint - (25 * 3600));
  //     RETURN NEW;
  //   END;
  //   $$ LANGUAGE plpgsql;
  // `
  // await knex.raw(triggerFunction)

  // const triggerName = 'delete_old_files_trigger'
  // const tableName = 'second_stream_files_locations'
  // const insertTriggerQuery = `
  //   CREATE TRIGGER ${triggerName}
  //   AFTER INSERT ON ${tableName}
  //   FOR EACH ROW
  //   EXECUTE FUNCTION delete_old_files_function();
  // `
  // await knex.raw(insertTriggerQuery)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('issues')
}
