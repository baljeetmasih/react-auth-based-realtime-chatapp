import express from 'express'

import * as chatController from '../Controllers/chat.js'

const router = express.Router();

router.get('/:channel/', chatController.getChatList)

export default router