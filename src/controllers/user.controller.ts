import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { StatusCode } from '../utils/status-code';

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await userService.getById(id);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAll();
        res.status(StatusCode.OK).json(result);
    } catch (error) {
        next(error);
    }
}
    
