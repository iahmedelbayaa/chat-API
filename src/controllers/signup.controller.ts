import * as signupService from '../services/signup.service';
import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../utils/status-code';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;
  try {
    // if (!user) {
    //   return res
    //     .status(StatusCode.BAD_REQUEST)
    //     .json('Missing required fields: name, email, password');
    // }
    await signupService.signup(user);
    res.status(StatusCode.CREATED).json(user);
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json(error.message);
  }
};
