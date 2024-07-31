// // src/server.ts
// import express from 'express';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import { connectDB } from './utils/db'; // Import DB connection function
// import authRoutes from './routes/authRoutes';
// import chatRoutes from './routes/chatRoutes';
// import gameRoutes from './routes/gameRoutes';
// import moveRoutes from './routes/moveRoutes';
// import userRoutes from './routes/userRoutes'; // If using userRoutes
// import { errorHandler } from './utils/errorHandler';
// import cors from 'cors';

// const app = express();
// const server = http.createServer(app);
// const io = new SocketIOServer(server, {
//   cors: {
//     origin: '*', // Allow requests from any origin (for development purposes)
//   },
// });

// // Connect to the database
// connectDB();

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/games', gameRoutes);
// app.use('/api/moves', moveRoutes);
// app.use('/api/users', userRoutes); // If using userRoutes

// // Error handler
// app.use(errorHandler);

// // Socket.IO integration
// import  {setupSocketIO}  from './socket'; // Import Socket.IO setup function
// setupSocketIO(io as any);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// src/server.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import gameRoutes from './routes/gameRoutes';
import chatRoutes from './routes/chatRoutes';
import authRoutes from './routes/authRoutes';
import moveRoutes from './routes/moveRoutes';
import { errorHandler } from './utils/errorHandler';
// import { Game } from './models/Game';
// import { createGame, getGameState } from './controllers/gameController';
// import {  loginUser, registerUser } from './controllers/authController';
// import { getChatsByGameId, addChatMessage } from './controllers/chatController';
// import { getMovesByGameId, addMove } from './controllers/moveController';
// import { verifyToken } from './utils/token';
// import { validateRegister, validateLogin } from './utils/validate';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/move', moveRoutes);

// errorhandler 
app.use(errorHandler);



// // Post route to create a new game (already covered by gameRoutes)
// app.post('/api/game', createGame);

// // Get gamestate by id route (already covered by gameRoutes)
// app.get('/api/game/state/:id', getGameState);

// // Get route to get chat messages by game ID (already covered by chatRoutes)
// app.get('/api/chat/:gameId', verifyToken, getChatsByGameId);

// // Post route to add a new chat message (already covered by chatRoutes)
// app.post('/api/chat/:gameId', verifyToken, addChatMessage);

// // Post route to register a new user (already covered by authRoutes)
// app.post('/api/auth/register', validateRegister, registerUser);

// // Post route to authenticate a user and generate a token (already covered by authRoutes)
// app.post('/api/auth/login', validateLogin, loginUser);

// // Get route to get moves by game ID (already covered by moveRoutes)
// app.get('/api/move/:gameId', verifyToken, getMovesByGameId);

// // Post route to add a new move (already covered by moveRoutes)
// app.post('/api/move/:gameId', verifyToken, addMove);


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

export default app;