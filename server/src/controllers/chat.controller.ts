import { Request, Response, NextFunction } from 'express';
import * as chatService from '../services/chat.service';
import { StatusCode } from '../utils/status-code';
import ApiError from '../utils/api-error';

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstId, secondId } = req.body;
    const result = await chatService.createChat(firstId, secondId);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const result = await chatService.getUserChats(userId);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const findChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstId, secondId } = req.body;
    const result = await chatService.findChat(firstId, secondId);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};
