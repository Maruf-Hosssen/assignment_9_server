import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { adoptionServices } from './adooption.service';

const adoptionPet = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const data = req.body;
  const result = await adoptionServices.adoptionPet(token, data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Adoption request submitted successfully',
    data: result,
  });
});

//get all adoption

const getalladoption = catchAsync(async (req: Request, res: Response) => {
  const result = await adoptionServices.getalladoption();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Adoption requests retrieved successfully',
    data: result,
  });
});

//update adoption

const updateAdoption = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.requestId;
  const data = req.body;
  const result = await adoptionServices.updateAdoption(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Adoption request updated successfully',
    data: result,
  });
});

export const adoptionControllers = {
  adoptionPet,
  getalladoption,
  updateAdoption,
};
