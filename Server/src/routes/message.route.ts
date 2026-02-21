import express from 'express'
import protectRoute from '../middleware/auth.middleware.js'
import  { getMessage }  from '../controllers/message.controller.js'
import protectedRoute from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/:id', protectedRoute, getMessage)

export default router