
// import { Request, Response } from 'express';
// import { createGameService, getGameService } from '../services/gameServices';

// const createGame = async (req: Request, res: Response) => {
//   const { player1, player2 } = req.body;
//   try {
//     const game = await createGameService(player1, player2);
//     res.status(201).json(game);
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

// const getGame = async (req: Request, res: Response) => {
//   const gameId = req.params.id;
//   try {
//     const game = await getGameService(gameId);
//     res.status(200).json(game);
//   } catch (err) {
//     res.status(404).json({ message: (err as Error).message });
//   }
// };

// export { createGame, getGame };

// src/controllers/gameController.ts
import { Request, Response } from 'express';
import {Game} from '../models/Game';
// import { Chess } from 'chess.js';
import { errorHandler } from '../utils/errorHandler';  // Use custom error handler

export const createGame = async (req: Request, res: Response) => {
  try {
    // const game = new Chess();
    // const newGame = await Game.create({ fen: game.fen(), moves: [] });
    // res.status(201).json(newGame);
    const { player1, player2 } = req.body;
    const game = new Game({ player1, player2 });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

export const updateGameState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { fen, moves } = req.body;
    // const game = await Game.findByIdAndUpdate(id, { fen, moves }, { new: true });
    const game = await Game.findByIdAndUpdate(id, req.body, { new: true });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

export const getGameState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

// export { createGame, getGameState , updateGameState } from './gameController';
