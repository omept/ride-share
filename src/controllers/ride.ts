import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as rideService from '../services/rideService';
import StartRidePayload from '../domain/requests/StartRidePayload';
import StopRidePayload from '../domain/requests/StopRidePayload';

const { messages } = config;


/**
 * Handle /start-ride POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function startRide(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ridePayload = req.body as StartRidePayload;
    const response = await rideService.insert(ridePayload, res.locals.loggedInPayload.userId);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.rides.startRide
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handle /stop-ride POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function stopRide(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ridePayload = req.body as StopRidePayload;
    const response = await rideService.stop(ridePayload, res.locals.loggedInPayload.userId);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.rides.startRide
    });
  } catch (err) {
    next(err);
  }
}
