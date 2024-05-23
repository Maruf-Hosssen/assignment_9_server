import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { petServices } from './pet.service';
import sendResponse from '../../../shared/sendResponse';
import { petFilterableFields } from './pet.constant';
import pick from '../../../shared/pick';

//add pet

const addPet = catchAsync(async (req: Request, res: Response) => {
  const result = await petServices.addPet(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Pet added successfully',
    data: result,
  });
});

//update pet

const updatePet = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.petId;
  const body = req.body;
  const result = await petServices.updatePet(id, body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pet profile updated successfully',
    data: result,
  });
});

// get all pet

const getAllPets = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, petFilterableFields);
  const option = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await petServices.getAllPets(filter, option);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Pets retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const petControllers = {
  addPet,
  updatePet,
  getAllPets,
};
