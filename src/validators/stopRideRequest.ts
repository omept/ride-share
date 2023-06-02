import Joi from 'joi';

export const stopRideRequestSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    rideId: Joi.number().min(0).label('CustomerId').required(),
  });
