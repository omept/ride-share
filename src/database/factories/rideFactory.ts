import { faker } from '@faker-js/faker';

import RideDetail from '../../domain/entities/RideDetail';
import { AppUser } from '../../../test/helper';
import Role from '../../resources/enums/Role';
import Ride from '../../models/Ride';

/**
 * Returns ride fake data.
 *
 * @returns {Promise<RideDetail>}
 */
export async function run(): Promise<RideDetail> {

  
  const driver = await AppUser(Role.DRIVER_USER, true);
  const customer = await AppUser(Role.DRIVER_USER, true);

  return  await Ride.query().insert({
    customerId: customer.id,
    driverId: driver.id,
    destination: faker.address.streetAddress(),
    startedFrom: faker.address.streetAddress(),
    fromLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
    toLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
    fromLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
    toLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
  }).returning('*');
}
