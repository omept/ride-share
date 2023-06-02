import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';
import { AppRide, init, TEST_PASSWORD } from '../helper';
import UserDetail from '../../src/domain/entities/UserDetail';

describe('POST /stop-ride API test', () => {
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

  test('should stop a ride.', async () => {
   const driverId = loggedInUser.id;
    const ride = await AppRide(driverId);
    const expectedRequest = {
      rideId: ride.id,
    };

    const expectedResponse = {
      code: StatusCodes.OK,
      message: expect.any(String),
    };


    return request(app)
      .post('/stop-ride')
      .set({ authorization })
      .send(expectedRequest)
      .then((res) => {
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});

