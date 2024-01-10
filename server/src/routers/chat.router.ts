import express from 'express';
import * as chatCtrl from '../controllers/chat.controller';

const router = express.Router();

router.post('/createchat', chatCtrl.createChat);
router.get('/getuserchats/:userId', chatCtrl.getUserChats);
router.post('/findchat', chatCtrl.findChat);

export default router;