
// import mongoose, { Document, Schema } from 'mongoose';

// interface IChat extends Document {
//   gameId: string;
//   messages: { user: string; message: string }[];
// }

// const ChatSchema: Schema = new Schema({
//   gameId: { type: String, required: true },
//   messages: { type: [{ user: String, message: String }], default: [] },
// });

// const Chat = mongoose.model<IChat>('Chat', ChatSchema);
// export default Chat;
// src/models/Chat.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  user: mongoose.Types.ObjectId;
  message: string;
}

export interface IChat extends Document {
  gameId: mongoose.Types.ObjectId | string;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true, },
  message: { type: String, required: true }
});

const ChatSchema: Schema = new Schema({
  gameId: { type: mongoose.Types.ObjectId, ref: 'Game', required: true },
  messages: [MessageSchema]
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
