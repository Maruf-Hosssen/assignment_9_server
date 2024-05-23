import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.user),
  userControllers.createUser,
);
router.post('/login', userControllers.loginUser);

router.get('/profile', auth(), userControllers.getSingleUser);

router.put('/profile', auth(), userControllers.updateUser);

export const userRoutes = router;
