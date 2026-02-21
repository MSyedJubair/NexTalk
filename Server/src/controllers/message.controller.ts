import Message from "../models/message.model.js";
import type { Request, Response } from "express";

export const getMessage = async (req: Request, res: Response) => {
  try {
    const receivingUserId = req.params.id;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: receivingUserId },
        { senderId: receivingUserId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 });
    console.log(messages);

    if (messages) {
      res.status(200).json({ messages });
    } else {
      res.status(400).json({
        message: "no messages",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server Error" });
  }
};
