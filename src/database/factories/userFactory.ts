import { faker } from '@faker-js/faker';

import UserDetail from '../../domain/entities/UserDetail';
import * as userService from '../../services/userService';
import Role from '../../resources/enums/Role';

/**
 * Returns user fake data.
 *
 * @returns {Promise<UserDetail>}
 */
export function run(): Promise<UserDetail> {
  return userService.insert({
    password: 'secret',
    name: faker.name.findName(),
    email: faker.internet.email(),
    roleId: Role.NORMAL_USER,
  });
}
