import ApiError from '../utils/api-error';
import { Response, Request, NextFunction } from 'express';

const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const value = await schema.validateAsync(body, { abortEarly: false });
      next();
    } catch (error) {
      const messages = error.details.map(
        (errorDetails: any) => errorDetails.message
      );
      next(ApiError.badRequest(messages));
    }
  };

export default validate;
