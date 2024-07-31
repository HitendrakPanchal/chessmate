
// import mongoose, { Document, Schema } from 'mongoose';

// interface IMove extends Document {
//   gameId: string;
//   move: string;
//   player: string;
//   timestamp: Date;
// }

// const MoveSchema: Schema = new Schema({
//   gameId: { type: String, required: true },
//   move: { type: String, required: true },
//   player: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Move = mongoose.model<IMove>('Move', MoveSchema);

// export default Move;
import mongoose, { Document, Schema } from 'mongoose';

interface IMove extends Document {
  gameId: mongoose.Types.ObjectId;
  move: string;
  player: mongoose.Types.ObjectId;
  timestamp: Date;
}

const MoveSchema: Schema = new Schema({
  gameId: { type:  mongoose.Types.ObjectId, ref: 'Game', required: true }, // Referencing Game
  move: { type: String, required: true },
  player: { type:  mongoose.Types.ObjectId, ref: 'User', required: true }, // Referencing User
  timestamp: { type: Date, default: Date.now },
});

const Move = mongoose.model<IMove>('Move', MoveSchema);

export default Move;
