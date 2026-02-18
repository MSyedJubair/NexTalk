import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET 

    const decoded = jwt.verify(token, jwtSecret!) as JwtPayload & { userId: string };

    if(!decoded) {
        res.status(401).json({ message: "Token Invalid" });
    }

    const user = User.findById(decoded.userId).select('-password')

    if (!user){
        res.status(401).json({ message: "User not Found" });
    }

    req.user = user

    next()

  } catch (error) {
    console.error(error);
  }
};

export default protectedRoute