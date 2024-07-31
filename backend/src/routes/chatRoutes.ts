// // src/routes/chatRoutes.ts
// import { Router } from 'express';
// import { getChat } from '../controllers/chatController';
// import { verifyToken } from '../utils/token';

// const router = Router();

// router.get('/:gameId', verifyToken, getChat);

// export default router;
// src/routes/chatRoutes.ts
import express from 'express';
import { getChatsByGameId, addChatMessage } from '../controllers/chatController';
import { verifyToken } from '../utils/token';
import { validateChatMessage } from '../utils/validate';

const router = express.Router();

// Route to get chat messages by game ID
router.get('/:gameId', verifyToken, getChatsByGameId);

// Route to add a new chat message
router.post('/:gameId', verifyToken, validateChatMessage, addChatMessage);

export default router;
