import userSchema from '../models/user.model';
import ApiError from '../utils/api-error';

export const getByEmail = async (email: string) => {
  try {
      const result = await userSchema.findOne({ email });
        return result;
  } catch (error) {
    throw ApiError.from(error);
  }
};
