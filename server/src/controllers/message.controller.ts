import { Request, Response, NextFunction } from 'express';
import * as messageService from '../services/message.service';
import { StatusCode } from '../utils/status-code';
import ApiError from '../utils/api-error';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, senderId, text } = req.body;
    const result = await messageService.createMessage(chatId, senderId, text);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.params;
    const result = await messageService.getMessage(chatId);
    res.status(StatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
};