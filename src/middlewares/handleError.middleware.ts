import logger from '@/config/logger.js';
import APIError from '@/utils/APIError.js';
import type { NextFunction, Request, Response } from 'express';
import z from 'zod';

const handleError = (
  err: APIError, // check if this type will break in case of system error.
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errorResponse: APIError;

  if (err instanceof z.ZodError) {
    errorResponse = {
      statusCode: 400,
      success: false,
      message: err.errors.map((e) => e.message).join(', '),
      data: [],
      errors: [],
      name: err.name,
    };
  } else {
    errorResponse = {
      statusCode: err.statusCode || 500,
      success: err.success || false,
      message: err.message || 'Something went wrong',
      data: err.data || [],
      errors: err.errors || [],
      name: err.name || 'Server Error',
    };
  }

  logger.error(`[SERVER] error `, errorResponse);
  res.status(errorResponse.statusCode).json(errorResponse);
};

export default handleError;
