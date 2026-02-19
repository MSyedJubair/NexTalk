import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";

import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  const encryptedPassword = await bcryptjs.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await new User({
      fullname,
      email,
      password: encryptedPassword,
    });

    if (newUser) {
      await newUser.save();
      const token = generateToken(res, newUser._id);

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      });
    } else {
      res.status(400).json({
        message: "Invalid User data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    // Match the pass
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.ENVIROMENT === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadedImage.secure_url,
    });

    res.status(200).json({ updatedUser });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json({message: 'Authenticated'})
  } catch (error) {
    console.error(error);
  }
  
}