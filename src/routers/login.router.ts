import express from 'express';
import * as signupCtrl from '../controllers/login.controller';
import signInSchema from '../validations/login.schema';
import validate from '../middlewares/validator';

const router = express.Router();

router.post('/', validate(signInSchema), signupCtrl.login);

export default router;
