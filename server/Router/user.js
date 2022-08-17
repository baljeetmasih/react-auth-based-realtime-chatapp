import express from 'express'

import * as userController from '../Controllers/user.js'

const router = express.Router();

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

export default router