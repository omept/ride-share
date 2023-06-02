import { Knex } from 'knex';


import Role from '../../resources/enums/Role';
import Table from '../../resources/enums/Table';
import { faker } from '@faker-js/faker';
import { AppUser } from '../../../test/helper';

export function seed(knex: Knex): Promise<any> {
  return knex(Table.RIDES).then(async () => {

    const driver = await AppUser(Role.DRIVER_USER, true);
    const customer = await AppUser(Role.DRIVER_USER, true);

    return Promise.all([
      knex(Table.RIDES).insert([
        {
          customerId: customer.id,
          driverId: driver.id,
          destination: faker.address.streetAddress,
          startedFrom: faker.address.streetAddress,
          fromLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
          toLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
          fromLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
          toLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
        }
      ])
    ]);
  });
}