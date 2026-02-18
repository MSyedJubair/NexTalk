import express from 'express'
import { signup, signin, logout, updateProfile } from '../controllers/auth.controller.js'
import protectRoute from '../middleware/auth.middleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)

router.post('/update-profile', protectRoute, updateProfile)

export default router