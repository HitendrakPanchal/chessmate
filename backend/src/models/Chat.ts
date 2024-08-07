
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
import  { Schema, Document, Types, model } from 'mongoose';

export interface IMessage {
  user: Types.ObjectId;
  message: string;
}

export interface IChat extends Document {
  gameId: Types.ObjectId | string;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema<IMessage>({
  user: { type: Schema.ObjectId, ref: 'User', required: true, },
  message: { type: String, required: true }
});

const ChatSchema: Schema = new Schema< IChat>({
  gameId: { type: Schema.ObjectId, ref: 'Game', required: true },
  messages: [MessageSchema]
});

const Chat = model<IChat>('Chat', ChatSchema);

export default Chat;
