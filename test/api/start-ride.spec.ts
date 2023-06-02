import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';
import { init, AppUser, TEST_PASSWORD } from '../helper';
import Role from '../../src/resources/enums/Role';
import { faker } from '@faker-js/faker';
import UserDetail from '../../src/domain/entities/UserDetail';

describe('POST /start-ride API test', () => {
  const password = TEST_PASSWORD;

  let authorization: string;
  let loggedInUser: UserDetail;

  beforeAll(async () => {
    loggedInUser = await init();

    const response = await request(app)
      .post('/login')
      .send({ email: loggedInUser.email, password });

    authorization = `Bearer ${response.body.data.accessToken}`;
  });

  test('should start a ride.', async () => {
    const driverUser = await AppUser(Role.DRIVER_USER, true);
    const customerUser = loggedInUser;
    const expectedRequest = {
      driverId: driverUser.id,
      customerId: customerUser.id,
      startedFrom: faker.address.streetAddress(),
      destination: faker.address.streetAddress(),
    };

    const expectedResponse = {
      code: StatusCodes.OK,
      message: expect.any(String),
      data: expect.any(Object)
    };

    const rideResponse = {
      startedAt: expect.any(String),
      startedFrom: expect.any(String),
      fromLatitude: expect.any(String),
      fromLongitude: expect.any(String),
      destination: expect.any(String),
      toLatitude: expect.any(String),
      toLongitude: expect.any(String),
      customerId: expect.any(Number),
      driverId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    };

    return request(app)
      .post('/start-ride')
      .set({ authorization })
      .send(expectedRequest)
      .then((res) => {
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toEqual(expectedResponse);
        expect(res.body.data).toEqual(rideResponse);
      });
  });
});

