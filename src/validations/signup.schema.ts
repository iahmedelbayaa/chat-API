import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

export default signupSchema;
