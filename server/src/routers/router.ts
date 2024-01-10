import { Router } from 'express';
import signupRouter from './signup.router';
import loginRouter from './login.router';
import userRouter from './user.router';
import chatRouter from './chat.router'
const router = Router();

router.use('/users', userRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/chat', chatRouter);
export default router;