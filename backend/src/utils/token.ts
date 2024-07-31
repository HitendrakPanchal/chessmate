// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import {jwtSecret} from './config';

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied' });

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.body.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };
// src/utils/token.ts
import jwt from 'jsonwebtoken';
import { jwtSecret } from './config';
import { Request, Response, NextFunction } from 'express';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

// Verify a token (can be used as middleware)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Access denied' });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.body.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    console.log('Invalid token');
    res.status(400).json({ message: 'Invalid token' });
  }
};