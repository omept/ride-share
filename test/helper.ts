import { faker } from '@faker-js/faker';

import knex from '../src/config/db';
import UserDetail from '../src/domain/entities/UserDetail';
import Table from '../src/resources/enums/Table';

import * as userService from '../src/services/userService';
import Role from '../src/resources/enums/Role';

const tables = [Table.USER_SESSIONS, Table.USERS];

export const TEST_EMAIL = faker.internet.email();
export const TEST_PASSWORD = faker.internet.password();

let userData: UserDetail;

/**
 * Create user.
 *
 * @returns Promise
 */
async function createUser(roleId: number): Promise<UserDetail> {
  switch (roleId) {
    case 1:
      roleId = Role.ADMIN;
      break;
    case 2:
      roleId = Role.NORMAL_USER;
      break;
    case 3:
      roleId = Role.DRIVER_USER;
      break;
    default:
      roleId = Role.NORMAL_USER;
  }

  return await userService.insert({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    name: faker.name.findName(),
    roleId
  });
}

/**
 * Delete all table's data.
 */
export async function init(): Promise<UserDetail> {
  if (userData) {
    return userData;
  }

  for (const table of tables) {
    await knex(table).del();
  }

  userData = await createUser(Role.NORMAL_USER);

  return userData;
}


/**
 * Create an app customer/admin/driver user
 */
export async function AppUser(role: number): Promise<UserDetail> {
  userData = await createUser(role);
  return userData;
}

/**
 * Create a driver user all table's data.
 */
export async function DriverUser(): Promise<UserDetail> {
  userData = await createUser(Role.DRIVER_USER);
  return userData;
}

/**
 * Get a random element from given array.
 *
 * @param {any[]} list
 * @returns {any}
 */
export function getRandomElement(list: any[]): any {
  return faker.helpers.arrayElement<any>(list);
}
