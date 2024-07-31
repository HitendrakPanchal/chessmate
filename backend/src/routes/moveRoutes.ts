// src/routes/moveRoutes.ts
// import { Router } from 'express';
// import { makeMove } from '../controllers/moveController';
// import { verifyToken } from '../utils/token';

// const router = Router();

// router.post('/', verifyToken, makeMove);

// export default router;

// src/routes/moveRoutes.ts
import express from 'express';
import { addMove, getMovesByGameId } from '../controllers/moveController';
import { verifyToken } from '../utils/token';
import { validateMove } from '../utils/validate';

const router = express.Router();

// Route to get moves by game ID
router.get('/:gameId', verifyToken, getMovesByGameId);

// Route to add a new move
router.post('/:gameId', verifyToken, validateMove, addMove);

export default router;
