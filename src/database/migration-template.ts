import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('tableName'))) {
    await knex.schema.createTable('tableName', table => {
      //
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('tableName')) {
    await knex.schema.dropTable('tableName');
  }
}
