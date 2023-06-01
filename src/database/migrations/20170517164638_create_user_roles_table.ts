import { Knex } from 'knex';

import Table from '../../resources/enums/Table';
import Role from '../../resources/enums/Role';

/**
 * Add user_roles table.
 *
 * @param {Knex} knex
 */
export function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(Table.USER_ROLES, (table) => {
      table.increments('id').primary();

      table.string('name', 50).unique().notNullable();
      table.string('description', 100).nullable();

      table.timestamps(true, true);
    })
    .then(async () => {
      await knex(Table.USER_ROLES)
        .truncate()
        .insert([
          {
            id: Role.ADMIN,
            name: 'Admin',
            description: 'This is super admin.'
          },
          {
            id: Role.NORMAL_USER,
            name: 'Normal User',
            description: 'This is normal user.'
          },
          {
            id: Role.DRIVER_USER,
            name: 'Driver User',
            description: 'This is driver user.'
          }
        ]);
    });
}

/**
 * Drop user_roles table.
 *
 * @param {Knex} knex
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(Table.USER_ROLES);
}
