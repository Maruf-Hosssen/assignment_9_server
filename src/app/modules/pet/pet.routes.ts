import express, { NextFunction, Request, Response } from 'express';
import { petControllers } from './pet.controller';
import auth from '../../middleware/auth';
import { petValidation } from './pet.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/pets',
  auth(),
  validateRequest(petValidation.pet),
  petControllers.addPet,
);

router.put(
  '/pets/:petId',
  auth(),
  validateRequest(petValidation.updatePet),
  petControllers.updatePet,
);

router.get('/pets', petControllers.getAllPets);
router.get('/pet/:petId', petControllers.getSinglePet);
export const petRouter = router;
