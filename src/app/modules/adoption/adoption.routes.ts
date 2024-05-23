import express, { NextFunction, Request, Response } from 'express';
import { adoptionControllers } from './adoption.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/adoption-request', auth(), adoptionControllers.adoptionPet);

router.get('/adoption-requests', auth(), adoptionControllers.getalladoption);

router.put(
  '/adoption-requests/:requestId',
  auth(),
  adoptionControllers.updateAdoption,
);

export const adoptionRoutes = router;
