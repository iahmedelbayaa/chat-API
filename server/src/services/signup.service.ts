import userSchema from '../models/user.model';
import ApiError from '../utils/api-error';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

export const signup = async (user: IUser) => {
  try {
    const { name, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    return result;
  } catch (error) {
    throw new Error("User with the given email already exist");
  }
};
