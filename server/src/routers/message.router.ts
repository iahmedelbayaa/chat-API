import express from 'express';
import * as messageCtrl from '../controllers/message.controller';

const router = express.Router();

router.post('/createmessage', messageCtrl.createMessage);
router.get('/getmessage/:chatId', messageCtrl.getMessage);

export default router;