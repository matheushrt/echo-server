import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', table => {
      table
        .string('id')
        .notNullable()
        .unique()
        .primary();
      table
        .string('email')
        .notNullable()
        .unique();
      table
        .integer('telegram_user_id')
        .notNullable()
        .unique();
      table.string('display_name');
      table.text('image');
      table.string('href');
      table.string('product');
      table.string('type');
      table.string('uri');
      table.string('external_url');
      table.string('followers');
      table.timestamps(true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('users')) {
    await knex.schema.dropTable('users');
  }
}
