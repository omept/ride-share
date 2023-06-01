import {Knex} from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('vehicles', (table) => {
    table.increments('id').primary();
    table.string('model').nullable();
    table.string('make').nullable();
    table.tinyint('year').unsigned().nullable();
    table.string('color', 50).nullable();
    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('vehicles');
}
