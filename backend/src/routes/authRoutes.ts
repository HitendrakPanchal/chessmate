
// import { Router } from 'express';
// // import { register, login } from '../controllers/authController';
// import { registerUser } from '../controllers/authController';
// import { validateRegister, validateLogin } from '../utils/validate';

// const router = Router();

// router.post('/register', validateRegister, register);
// router.post('/login', validateLogin, login);

// export default router;

// src/routes/authRoutes.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validateRegister, validateLogin } from '../utils/validate';
import { verifyToken } from '../utils/token';
const router = express.Router();

// Route to register a new user
router.post('/register', validateRegister, registerUser);

// Route to authenticate a user and generate a token
router.post('/login', validateLogin, loginUser);

// 
// router.get('/me', verifyToken, getMe)

export default router;
