import express from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.get('/find/:id', userCtrl.getById);
router.get('/getusers' , userCtrl.getAll);

export default router;