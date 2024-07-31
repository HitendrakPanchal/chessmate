// import { Request, Response, NextFunction } from 'express';

// export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password, name } = req.body;
//   if (!email || !password || !name) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }
//   next();
// };

// export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }
//   next();
// };
// src/utils/validate.ts
import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  next();
};


export const validateMove = (req: Request, res: Response, next: NextFunction) => {
  const { gameId, move, player } = req.body;
  if (!gameId || !move || !player) {
    return res.status(400).json({ message: 'gameId, move, and player are required' });
  }
  next();
};


export const validateChatMessage = (req: Request, res: Response, next: NextFunction) => {
  const { gameId, user, message } = req.body;
  if (!gameId || !user || !message) {
    return res.status(400).json({ message: 'gameId, user, and message are required' });
  }
  next();
};