import { Request, Response } from "express";
import User from "../models/user.model.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    
    const users = await User.find({
      _id: { $ne: currentUser._id }, // exclude current user
    }).select("-password");

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server Error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server Error" });
  }
};
