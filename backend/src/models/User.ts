// import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcrypt';

// interface IUser extends Document {
//   email: string;
//   password: string;
// }

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true, unique: true, index: true },
//   password: { type: String, required: true }
// });

// // Hash password before saving the user
// UserSchema.pre<IUser>('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// const User = mongoose.model<IUser>('User', UserSchema);

// // export default User;
// import mongoose, { Document, Schema } from 'mongoose';

// interface IUser extends Document {
//   email: string;
//   password: string;
//   name: string;
// }

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
// });

// const User = mongoose.model<IUser>('User', UserSchema);
// export default User;
// src/models/User.ts

import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);

// export  User;
