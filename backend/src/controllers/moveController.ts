// src/controllers/moveController.ts
import { Request, Response } from 'express';
import Move from '../models/Move';
import { errorHandler } from '../utils/errorHandler';
import mongoose from 'mongoose';

// Get moves by gameId
export const getMovesByGameId = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const moves = await Move.find({ gameId }).populate('player', 'username');
    if (!moves) {
      return res.status(404).json({ message: 'Moves not found' });
    }
    res.json(moves);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};

// Add a move to the game
export const addMove = async (req: Request, res: Response) => {
  try {
    const { gameId, move, player } = req.body;

    const newMove = new Move({
      gameId: new mongoose.Types.ObjectId(gameId),
      move,
      player: new mongoose.Types.ObjectId(player),
    });

    await newMove.save();
    res.status(201).json(newMove);
  } catch (error) {
    errorHandler(error, req, res, () => {});
  }
};
