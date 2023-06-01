import { faker } from '@faker-js/faker';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';
import { getRandomElement, init, AppUser, TEST_EMAIL, TEST_PASSWORD } from '../helper';
import Role from '../../src/resources/enums/Role';

describe('POST /start-ride API test', () => {
  const email = TEST_EMAIL;
  const password = TEST_PASSWORD;

  let authorization: string;

  beforeAll(async () => {
    await init();

    const response = await request(app)
      .post('/login')
      .send({ email, password });

    authorization = `Bearer ${response.body.data.accessToken}`;
  });

  test('should start a ride.', async () => {
    const driverUser = await AppUser(Role.DRIVER_USER);
    const customerUser = await AppUser(Role.NORMAL_USER);
    const expectedRequest = {
      driverId: driverUser.id,
      customerId: customerUser.id,
      from: expect.any(String),
      destination: expect.any(String),
    };

    const expectedResponse = {
      code: StatusCodes.OK,
      message: expect.any(String),
      data: expect.any(Array)
    };

    const rideResponse = {
      from: expect.any(String),
      fromXCord: expect.any(Number),
      fromYCord: expect.any(Number),
      destination: expect.any(String),
      destinationXCord: expect.any(Number),
      destinationYCord: expect.any(Number),
      customerId: expect.any(Number),
      driverId: expect.any(Number),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
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

