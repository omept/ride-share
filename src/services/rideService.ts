import Ride from '../models/Ride';
import logger from '../utils/logger';
import RideDetail from '../domain/entities/RideDetail';
import StartRidePayload from '../domain/requests/StartRidePayload';
import { faker } from '@faker-js/faker';
import BadRequestError from '../exceptions/BadRequestError';
import config from '../config/config';
import User from '../models/User';
import StopRidePayload from '../domain/requests/StopRidePayload';


const { errors } = config;

/**
 * Insert ride from given ride payload
 *
 * @param {StartRidePayload} params
 * @returns {Promise<RideDetail>}
 */
export async function insert(params: StartRidePayload, userId: number): Promise<RideDetail> {
  logger.log('info', 'start a ride ', params);

  const users = await User.query().findByIds([params.customerId, params.driverId]);
  if (users.length != 2) {
    throw new BadRequestError(errors.driverAndCustomerMustBeValid);
  }

  let loggedInUserRequest = false;
  const loggedInUserId = userId;
  users.forEach((user: User) => {
    if (user.id == loggedInUserId) {
      loggedInUserRequest = true;
    }
  })
  if (!loggedInUserRequest) {
    throw new BadRequestError(errors.driverAndCustomerMustBeValid);
  }

  if (params.destination.length == 0) {
    throw new BadRequestError(errors.destinationMustBeValid);
  }

  const ride = await Ride.query().insert({
    driverId: params.driverId,
    customerId: params.customerId,
    destination: params.destination,
    startedFrom: params.startedFrom,
    fromLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
    toLatitude: Number(parseFloat(faker.address.latitude())).toFixed(2),
    fromLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
    toLongitude: Number(parseFloat(faker.address.longitude())).toFixed(2),
    startedAt: new Date().toISOString(),
  }).returning('*');

  const res = {
    id: ride.id,
    customerId: ride.customerId,
    driverId: ride.driverId,
    destination: ride.destination,
    fromLatitude: ride.fromLatitude,
    startedFrom: ride.startedFrom,
    toLatitude: ride.toLatitude,
    fromLongitude: ride.fromLongitude,
    toLongitude: ride.toLongitude,
    startedAt: ride.startedAt,
    updatedAt: new Date(ride.updatedAt).toLocaleString(),
    createdAt: new Date(ride.updatedAt).toLocaleString()
  };

  logger.log('debug', 'Inserted ride successfully:', ride);

  return res;
}


/**
 * stop ride from given ride payload
 *
 * @param {StopRidePayload} params
 * @returns {Promise<RideDetail>}
 */
export async function stop(params: StopRidePayload, userId: number): Promise<void> {
  logger.log('info', 'stop a ride ', params);

  const appRide = await Ride.query().findById(params.rideId);
  if (!appRide) {
    throw new BadRequestError(errors.rideInvalid);
  }

  let loggedInUserRequest = false;
  const loggedInUserId = userId;

  if ((appRide.driverId == loggedInUserId) || (appRide.customerId == loggedInUserId)) {
    loggedInUserRequest = true;
  }
  if (!loggedInUserRequest) {
    throw new BadRequestError(errors.driverAndCustomerMustBeValid);
  }


  const ride = await Ride.query().findById(appRide.id).patch({
    endedAt: new Date().toLocaleString()
  }).returning('*');


  logger.log('debug', 'ride stopped successfully:', ride);

}
