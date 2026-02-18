import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Listening or Port:${PORT}`);
    connectDB()
})