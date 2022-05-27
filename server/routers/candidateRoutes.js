import express from 'express'
import { createCandidate, findCandidate, getAllCandidate } from '../controllers/candidateControler.js'
import { admin, auth } from '../middleware/authMiddleware.js'


const router = express.Router()
router.post('/add',auth,admin,createCandidate)
router.get('/list',auth,admin,getAllCandidate)
router.get('/:keyword',auth,findCandidate)

export default router