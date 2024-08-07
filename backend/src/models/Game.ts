// import mongoose, { Document, Schema } from 'mongoose';

// interface IGame extends Document {
//   players: string[];
//   moves: string[];
//   status: string;  // Added to track game status
// }

// const GameSchema: Schema = new Schema({
//   players: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],  // Referencing User
//   moves: [{ type: String }],
//   status: { type: String, default: 'active' }  // Default to 'active'
// });

// const Game = mongoose.model<IGame>('Game', GameSchema);

// export default Game;


// import mongoose, { Document, Schema } from 'mongoose';

// interface IGame extends Document {
//   player1: string;
//   player2: string;
//   status: string;
//   moves: string[];
// }

// const GameSchema: Schema = new Schema({
//   player1: { type: String, required: true },
//   player2: { type: String, required: true },
//   status: { type: String, default: 'ongoing' },
//   moves: { type: [String], default: [] },
// });

// const Game = mongoose.model<IGame>('Game', GameSchema);
// export default Game;

// src/models/Game.ts
import  { Schema, Document, model } from 'mongoose';


export interface Game {
  player1: string;
  player2?: string;
  status: string;
  moves: string[];
  // add fen
  fen?: string;
}

interface IGame extends Document {
  player1: string;
  player2: string;
  status: string;
  moves: string[];
  fen?: string;
}

const GameSchema: Schema = new Schema({
  player1: { type: String, required: true },
  player2: { type: String, default: null },
  status: { type: String, default: 'waiting' },
  moves: { type: [String], default: [] },
  fen: { type: String, default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' },
});

export const GameModel = model<IGame>('Game', GameSchema);
