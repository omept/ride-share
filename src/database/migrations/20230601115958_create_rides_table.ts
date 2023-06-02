import { Knex } from 'knex';
import Table from '../../resources/enums/Table';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('rides', (table) => {
    table.increments('id').primary();
   
    table
      .integer('customer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USERS);
      
      table
      .integer('driver_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USERS);


      table.double('from_latitude', 10, 6).nullable().index();
      table.double('to_latitude', 10, 6).nullable().index();
      table.double('from_longitude', 10, 6).nullable().index();
      table.double('to_longitude', 10, 6).nullable().index();

      table.string('started_from').nullable();
      table.string('destination').nullable();
      table.timestamp('started_at').nullable();
      table.timestamp('ended_at').nullable();
  
    table.timestamps(true, true);
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('rides');
}
