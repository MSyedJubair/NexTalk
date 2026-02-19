import express from 'express'
import protectRoute from '../middleware/auth.middleware.js'
import  { getAllUsers, getCurrentUser }  from '../controllers/user.controller.js'

const router = express.Router()

router.get('/all', protectRoute, getAllUsers)
router.get('/me', protectRoute, getCurrentUser)

export default router