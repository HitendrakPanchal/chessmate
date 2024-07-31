// src/routes/gameRoutes.ts

// import { Router } from 'express';
// import { createGame, getGame } from '../controllers/gameController';
// import { verifyToken } from '../utils/token';

// const router = Router();

// router.post('/', verifyToken, createGame);
// router.get('/:id', verifyToken, getGame);

// export default router;

// src/routes/gameRoutes.ts
import express from 'express';
import { createGame, getGameState, updateGameState } from '../controllers/gameController';

const router = express.Router();

// Route to create a new game
router.post('/', createGame);

// Route to get the state of a specific game by ID
router.get('/state/:id', getGameState);

// Route to update the state of a specific game by ID
router.put('/:id', updateGameState);

export default router;
