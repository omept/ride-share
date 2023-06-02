import { Knex } from 'knex';

import * as bcrypt from '../../utils/bcrypt';
import Role from '../../resources/enums/Role';
import Table from '../../resources/enums/Table';
import { faker } from '@faker-js/faker';

export function seed(knex: Knex): Promise<any> {
  return knex(Table.USERS).then(async () => {
    return Promise.all([
      knex(Table.USERS).insert([
        {
          role_id: Role.ADMIN,
          name: 'Sagar Chamling',
          email: 'sgr.raee@gmail.com',
          password: await bcrypt.hash('secret')
        }, {
          role_id: Role.DRIVER_USER,
          name: faker.name,
          email: faker.internet.email,
          password: await bcrypt.hash('secret')
        }, {
          role_id: Role.NORMAL_USER,
          name: faker.name,
          email: faker.internet.email,
          password: await bcrypt.hash('secret')
        }
      ])
    ]);
  });
}
