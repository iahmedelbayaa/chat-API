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

//searchUser
export const searchUser = async (name: string) => {
  try {
    const result = await userSchema.find({ name });
    return result;
  } catch (error) {
    throw ApiError.from(error);
  }
};

export const getById = async (id: string) => {
  try {
    const result = await userSchema.findById(id);
    return result;
  } catch (error) {
    throw ApiError.from(error);
  }
};

export const getAll = async () => {
  try {
    const result = await userSchema.find().select('name email _id');;
    return result;
  } catch (error) {
    throw ApiError.from(error);
  }
};
