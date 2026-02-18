import express from 'express'
import { signup, signin, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js'
import protectRoute from '../middleware/auth.middleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)

router.put('/update-profile', protectRoute, updateProfile)

router.get('/check', protectRoute, checkAuth)

export default router