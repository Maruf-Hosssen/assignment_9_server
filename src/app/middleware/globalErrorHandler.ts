import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import handleZodError, { TerrorSources } from '../error/zodError';
import { AppError } from '../error/appError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessage = err.message || 'Something went wrong';
  let errorDetails: TerrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: err,
  });

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
};

export default globalErrorHandler;
