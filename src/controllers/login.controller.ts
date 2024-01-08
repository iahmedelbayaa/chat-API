import * as loginService from '../services/login.service';
import { Request, Response } from 'express';
import { StatusCode } from '../utils/status-code';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.login({ email, password });
    res.status(StatusCode.OK).json(user);
  } catch (error) {
    res
      .status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR)
      .json(error);
  }
};
