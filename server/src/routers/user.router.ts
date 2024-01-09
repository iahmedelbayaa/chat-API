import express from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.get('/user/:id', userCtrl.getById);
router.get('/getusers' , userCtrl.getAll);

export default router;