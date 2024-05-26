import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { userServices } from './user.service';

import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { JwtPayload } from 'jsonwebtoken';
import { tokenType } from '../../interface/tokenType';

//create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createUser(req);
  const userData = result.result;
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: result.accessToken,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    },
  });
});

//login user

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.loginUser(req.body);
  const userData = result.userData;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      token: result.accessToken,
    },
  });
});

//get single user

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userServices.getSingleUser(token as string);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User profile retrieved successfully',
    data: {
      id: result?.id,
      name: result?.name,
      email: result?.email,
      role: result?.role,
    },
  });
});

//get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsers(
    req.headers.authorization as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrive all user successfully',
    data: result,
  });
});

//update user

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await userServices.updateUser(token as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  loginUser,
  getSingleUser,
  updateUser,
  getAllUsers,
};
