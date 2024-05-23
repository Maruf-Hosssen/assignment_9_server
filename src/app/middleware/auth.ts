import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AppError } from '../error/appError';
import { jwtHelpers } from '../../shared/tokenHelper';

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const verifyUser = jwtHelpers.verifyToken(token, 'access');

      req.user = verifyUser;
      if (!roles.includes(verifyUser.role) && roles.length) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden access');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
