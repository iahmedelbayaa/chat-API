import { Router } from 'express';
import signupRouter from './signup.router';

const router = Router();

router.use('/signup', signupRouter);
export default router;