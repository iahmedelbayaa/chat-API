import { Router } from "express";
import { signup } from "../controllers/signup.controller";
import signupSchema from '../validations/signup.schema';
import validate from '../middlewares/validator';

const router = Router();
router.post('/', validate(signupSchema), signup);
export default router;