import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    // const users = await User.find({ clerkId: { $ne: currentUserId } });
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });//latest message at the bottom

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
