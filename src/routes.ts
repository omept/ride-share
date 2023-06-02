import { Router } from 'express';

import validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as rideController from './controllers/ride';
import * as authController from './controllers/auth';
import authenticate from './middlewares/authenticate';
import { loginSchema } from './validators/loginRequest';
import { userPOSTSchema } from './validators/userRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';
import { startRideRequestSchema } from './validators/startRideRequest';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.post(
  '/users',
  authenticate,
  validate(userPOSTSchema),
  userController.store
);

router.post( '/start-ride',
  authenticate,
  validate(startRideRequestSchema),
  rideController.startRide
);

export default router;
