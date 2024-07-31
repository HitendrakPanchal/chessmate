// import { Request, Response } from 'express';
// import chatServices from '../services/chatServices';

// export const getChat = async (req: Request, res: Response) => {
//   const gameId = req.params.gameId;
//   try {
//     const chat = await chatServices.getChat(gameId);
//     res.json(chat);
//   } catch (err) {
//     res.status(404).json({ message: 'Chat not found' });
//   }
// };


// // src/controllers/chatController.ts
// import { Request, Response } from 'express';
// // import * as Message from '../models/Message';
// import create from '../models/Chat';
// import { errorHandler } from '../utils/errorHandler';
// import Chat from '../models/Chat';

// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const { gameId, userId, text } = req.body;
//     // const message = await Message.create({ gameId, userId, text });
//     const message = new create({ gameId, userId, text });
//     res.status(201).json(message);
//   } catch (error) {
//     errorHandler(error, req, res, () => {});
//   }
// };

// export const getMessages = async (req: Request, res: Response) => {
//   try {
//     const { gameId } = req.params;
//     // const messages = await Message.find({ gameId });
//     const messages = await Chat.find({ gameId });
//     res.json(messages);
//   } catch (error) {
//     errorHandler(error, req, res, () => {});
//   }
// };


// src/controllers/chatController.ts
import { Request, Response } from 'express';
import Chat from '../models/Chat';
import { errorHandler } from '../utils/errorHandler';
import mongoose from 'mongoose';

// Get chat messages by gameId
export const getChatsByGameId = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const chat = await Chat.findOne({ gameId : new mongoose.Types.ObjectId(gameId) }).populate('messages.user', 'username');
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

// Add a message to chat
export const addChatMessage = async (req: Request, res: Response) => {
  try {
    const { gameId, user, message } = req.body;

    // Convert gameId and user to ObjectId
    const gameIdObject = new mongoose.Types.ObjectId(gameId);
    const userObject = new mongoose.Types.ObjectId(user);

    let chat = await Chat.findOne({ gameId: gameIdObject });

    if (!chat) {
      chat = new Chat({
        gameId: gameIdObject,
        messages: [{ user: userObject, message }]
      });
    } else {
      chat.messages.push({ user: userObject, message });
    }

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};
