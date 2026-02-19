import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dns from 'node:dns'

dns.setServers(['8.8.8.8', '8.8.4.4']);

import authRoutes from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import { connectDB } from './lib/db.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('users', userRoute)

app.listen(PORT, () => {
    console.log(`Listening or Port:${PORT}`);
    connectDB()
})