import express from 'express'

import * as profileController from '../Controllers/profile.js'

const router = express.Router();

router.get('/:id', profileController.getAllProifle)
router.get('/search/:keyword/:id', profileController.searchAllProifle)
router.get('/sp/:selectedId/:currentUesrID',profileController.getProfileInfo) // sp === specfic

// start chat channel 

router.post('/chat',profileController.startChatChannel)


export default router