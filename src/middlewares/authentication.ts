import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { getByEmail } from '../services/user.service';
import { verifyAccessToken } from '../utils/jwt';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer')) {
      return res.status(401).json({ error: 'Token is not exist' });
    }
    const accessToken: string = token.slice(7);

    const payload: JwtPayload = await verifyAccessToken(accessToken);

    const user = await getByEmail(payload.email);
    if (!user) {
      throw new Error('Unauthorized: user not found');
    }

    req.authenticatedUser = user;
    next();
  } catch (error) {
    return next(error);
  }
};
