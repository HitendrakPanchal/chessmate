// import { Request, Response } from 'express';
// import * as authServices from '../services/authServices';
// // import aythService from '../services/authService';


// const register = async (req: Request, res: Response) => {
//   const { email, password, name } = req.body;
//   try {
//     const user = await authServices.registerService(email, password, name);
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

// const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     const token = await authServices.loginService(email, password);
//     res.json({ token });
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

// export { register, login };

// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';  // Utility for generating tokens
// import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler';
// import { jwtSecret } from '../utils/config';

// Register a new user

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    errorHandler(error, req, res, () => {});
    // res.status(500).json({ message: (error as Error).message });
  }
};

// Authenticate a user and generate a token
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });   
     }

    const token = generateToken(user._id as string);
    res.status(200).json({ token });
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

// // Get the current user
// export const getMe = async (req: Request, res: Response) => {
//     try {
//       const user = await User.findById(req.user?.id).select('username');

//     } catch (error) {
//         errorHandler(error, req, res, () => {});
//     }
// } 