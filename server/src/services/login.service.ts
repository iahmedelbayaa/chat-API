import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';
import * as jwt from '../utils/jwt';
import ApiError from '../utils/api-error';

export const login = async (user: any) => {
  try {
    const { email, password } = user;
    if (!user) {
      throw ApiError.badRequest('Missing email or password');
    }
    const storedUser = await userService.getByEmail(email);

    if (!storedUser) {
      throw ApiError.unauthorized('Bad Credentials: Invalid email');
    }
    const hashedPassword = storedUser.password;
    const areEqualPasswords = await bcrypt.compare(password, hashedPassword);

    if (!areEqualPasswords) {
      throw ApiError.unauthorized('Bad Credentials: Invalid password');
    }

    const accessToken = await jwt.generateAccessToken(email);
    const refreshToken = await jwt.generateRefreshToken(email);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      name: storedUser.name,
    };
  } catch (error) {
    throw ApiError.from(error);
  }
};
