// src/components/Game.tsx
import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import axios from 'axios';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<any>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/game/state/60c72b2f9b1e8a4b4c8b4567');
        setGameState(response.data);
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
    fetchGame();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Game</h1>
      <div className="flex justify-center">
        <Chessboard
          position={gameState ? gameState.board : 'start'}
          onPieceDrop={(sourceSquare, targetSquare, piece) => {
            // Handle move logic
            return true; // Return true to indicate a successful move
          }}
        />
      </div>
    </div>
  );
};

export default Game;
