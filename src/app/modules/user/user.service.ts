import prisma from '../../../shared/prisma';
import * as bcrypt from 'bcrypt';
import { AppError } from '../../error/appError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../shared/tokenHelper';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

//create user
const createUser = async (req: any) => {
  const hashpassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
  };
  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};
//login user

const loginUser = async (data: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
    },
  });
  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    userData.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password does not matched');
  }
  const accessToken = jwtHelpers.generateToken(
    { email: userData.email, password: userData.password },
    'access',
    '30d',
  );

  return {
    userData,
    accessToken,
  };
};

//get single user

const getSingleUser = async (token: string) => {
  const decodedToken = jwt.verify(token, 'access') as JwtPayload;
  const userData = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },
  });
  const result = await prisma.user.findUnique({
    where: {
      id: userData?.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

//update user

const updateUser = async (token: string, data: Partial<User>) => {
  const decodedToken = jwt.verify(token, 'access') as JwtPayload;
  const userData = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },
  });
  const id = userData?.id;
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const userServices = {
  createUser,
  loginUser,
  getSingleUser,
  updateUser,
};
