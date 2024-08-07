
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
import { GameModel} from '../models/Game';
// import { Chess } from 'chess.js';
import { errorHandler } from '../utils/errorHandler';  // Use custom error handler
import { Chess } from 'chess.js';

export const createGame = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    // Check if there's any game waiting for a second player
    let game = await GameModel.findOne({ status: 'waiting' });

    if (game) {
      // If a waiting game is found, join it as player2
      game.player2 = username;
      game.status = 'ongoing';
      game.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';  // Set default FEN
      await game.save();
      res.status(201).json(game);
    } else {
      // If no waiting game is found, create a new game and set player1
      game = new GameModel({ player1: username });
      await game.save();
      res.status(201).json(game);
    }
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

export const updateGameState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const { fen, moves } = req.body;
    // const game = await Game.findByIdAndUpdate(id, { fen, moves }, { new: true });
    const game = await GameModel.findByIdAndUpdate(id, req.body, { new: true });
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
    const game = await GameModel.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

export const makeMove = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { from, to } = req.body;

    const game = await GameModel.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const chess = new Chess(game.fen);
    const move = chess.move({ from, to, promotion: 'q' });

    if (move === null) {
      return res.status(400).json({ message: 'Invalid move' });
    }

    game.fen = chess.fen();
    game.moves.push(`${from}-${to}`);
    await game.save();

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// export { createGame, getGameState , updateGameState } from './gameController';
