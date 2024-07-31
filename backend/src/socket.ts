// import { Server, Socket } from 'socket.io';
// import http from 'http';
// import Game from './models/Game';
// import Chat from './models/Chat';
// import Move from './models/Move';
// import { verifyToken } from './utils/token';

// // Initialize Socket.IO
// const initSocket = (server: http.Server) => {
//   const io = new Server(server);

//   // Middleware to check token
//   io.use((socket: Socket, next: (err?: any) => void) => {
//     const token = socket.handshake.auth.token;
//     if (!token) return next(new Error('Authentication error'));

//     verifyToken({ header: () => token } as any, {} as any, next);
//   });

//   io.on('connection', (socket: Socket) => {
//     console.log('User connected:', socket.id);

//     // Join a game room
//     socket.on('joinGame', async (gameId: string) => {
//       socket.join(gameId);
//       console.log(`User ${socket.id} joined game ${gameId}`);
//     });

//     // Handle a new move
//     socket.on('makeMove', async ({ gameId, move, player }: { gameId: string, move: string, player: string }) => {
//       try {
//         // Save the move
//         const newMove = new Move({ gameId, move, player });
//         await newMove.save();

//         // Update the game state
//         const game = await Game.findById(gameId);
//         if (!game) throw new Error('Game not found');
        
//         game.moves.push((newMove._id as string).toString());
//         await game.save();

//         // Broadcast the move to all clients in the game room
//         io.to(gameId).emit('moveMade', { move, player, timestamp: newMove.timestamp });
//         console.log(`Move made in game ${gameId}: ${move}`);
//       } catch (err) {
//         console.error('Error making move:', (err as Error).message);
//       }
//     });

//     // Handle chat messages
//     socket.on('sendMessage', async ({ gameId, user, message }: { gameId: string, user: string, message: string }) => {
//       try {
//         // Save the chat message
//         const chat = await Chat.findOne({ gameId });
//         if (!chat) {
//           const newChat = new Chat({ gameId, messages: [{ user, message }] });
//           await newChat.save();
//         } else {
//           chat.messages.push({ user, message });
//           await chat.save();
//         }

//         // Broadcast the message to all clients in the game room
//         io.to(gameId).emit('messageReceived', { user, message });
//         console.log(`Message from ${user} in game ${gameId}: ${message}`);
//       } catch (err) {
//         console.error('Error sending message:', (err as Error).message);
//       }
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });
// };

// export default initSocket;

// // src/socket.ts
// src/socket.ts
import { Server as SocketIOServer, Socket } from 'socket.io';

export const setupSocketIO = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Handle chat message events
    socket.on('chat message', (data) => {
      console.log('Received chat message:', data);
      // Broadcast the message to all clients in the same game room
      io.to(data.gameId).emit('chat message', data);
    });

    // Handle game move events
    socket.on('game move', (data) => {
      console.log('Received game move:', data);
      // Broadcast the move to all clients in the same game room
      io.to(data.gameId).emit('game move', data);
    });

    // Join a game room
    socket.on('join room', (gameId: string) => {
      socket.join(gameId);
      console.log(`Socket ${socket.id} joined room ${gameId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
