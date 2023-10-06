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

  const triggerCheckStatusFunction = `
    CREATE OR REPLACE FUNCTION check_status()
    RETURNS TRIGGER AS $$
    BEGIN
      IF OLD.status = 'pending' AND NEW.status = 'open' THEN
        RAISE EXCEPTION 'Can not change from pending to open.';
      ELSIF OLD.status = 'close' AND NEW.status IN ('open', 'pending') THEN
        RAISE EXCEPTION 'Can not change from close to open or pending.';
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `
  await knex.raw(triggerCheckStatusFunction)

  const insertTriggerCheckStatusQuery = `
    CREATE TRIGGER check_before_status_update
    BEFORE UPDATE ON issues
    FOR EACH ROW
    EXECUTE FUNCTION check_status();
  `
  await knex.raw(insertTriggerCheckStatusQuery)

  const triggerUpdateIssueFunction = `
    CREATE OR REPLACE FUNCTION update_issue_history()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO issue_history (issue_id, status, updated_at)
      VALUES (NEW.id, NEW.status, NOW());
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `
  await knex.raw(triggerUpdateIssueFunction)

  const insertTriggerUpdateIssueQuery = `
    CREATE TRIGGER update_issue_history_after_update
    AFTER UPDATE ON issues
    FOR EACH ROW
    EXECUTE FUNCTION update_issue_history();
  `
  await knex.raw(insertTriggerUpdateIssueQuery)

  const insertTriggerInsertIssueQuery = `
    CREATE TRIGGER update_issue_history_after_insert
    AFTER INSERT ON issues
    FOR EACH ROW
    EXECUTE FUNCTION update_issue_history();
  `
  await knex.raw(insertTriggerInsertIssueQuery)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('issues')
}
