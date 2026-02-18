import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

export const generateToken = (res: Response, userId: any) => {
    const jwtSecret = process.env.JWT_SECRET

    const payload = {
        userId: userId,
    }

    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '7d'
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.ENVIROMENT === 'production',
        sameSite: 'strict'
    })

    return token
}