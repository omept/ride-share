import { Knex } from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('ride_logs', (table) => {
    table.increments('id').primary();

    table.integer('ride_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable(Table.RIDES).onUpdate('CASCADE').onDelete('NO ACTION');

    table.double('current_latitude', 10, 6).nullable().index();
    table.double('current_longitude', 10, 6).nullable().index();

    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('ride_logs');
}
