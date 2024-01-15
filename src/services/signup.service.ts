import userSchema from '../models/user.model';
import * as userService from '../services/user.service';
import ApiError from '../utils/api-error';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

export const signup = async (user: IUser) => {
  try {
    const { name, email, password } = user;
    //check If body req is empty
    if (!name || !email || !password) {
      throw ApiError.badRequest(
        'Missing required fields: name, email, password'
      );
    }
    const storedUser = await userService.getByEmail(email);
    if (storedUser) {
      throw ApiError.badRequest(
        'This email is already taken, choose another one'
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    return result;
  } catch (error) {
    throw ApiError.from(error);
  }
};
