import Joi from 'joi';

export const startRideRequestSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    customerId: Joi.number().min(0).label('CustomerId').required(),
    driverId: Joi.number().min(0).label('DriverId').required(),
    destination: Joi.string().label('Destination').required(),
    startedFrom: Joi.string().label('StartedFrom').required()
  });
