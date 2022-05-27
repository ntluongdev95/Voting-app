import express from 'express'
import { createEvent,getEvents,getEventById,voting} from '../controllers/eventController.js'

import { auth,admin } from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/create',auth,admin,createEvent)
router.get('/',auth,getEvents)
router.get('/:id',auth,getEventById)
router.put('/voting',auth,voting)
export default router