// // src/components/Game.tsx
// import React, { useEffect, useState } from 'react';
// import { Chessboard } from 'react-chessboard';
// import axios from 'axios';

// const Game: React.FC = () => {
//   const [gameState, setGameState] = useState<any>(null);

//   useEffect(() => {
//     const fetchGame = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/game/state/60c72b2f9b1e8a4b4c8b4567');
//         setGameState(response.data);
//       } catch (error) {
//         console.error('Error fetching game state:', error);
//       }
//     };
//     fetchGame();
//   }, []);


//   return (
//     // add flex direction column to center the game
//     <div className="container flex flex-col justify-center items-center h-screen -left-1/4 mx-auto mt-4 min-w-full ">

//       <div className=" justify-center">

//         <h1 className="text-2xl font-bold mb-4">Game</h1>
//       </div>

//       <div className=" justify-center">
//         <Chessboard
//           position={gameState ? gameState.board : 'start'}
//           boardOrientation={gameState ? gameState.orientation : 'white'}
//           onPieceClick={
//             // give the suggestion to move the piece
//             (square) => {
//               // console.log(square);
//               if (gameState) {
//                 gameState.board[square] === 'w' ? gameState.suggestMove(square) : gameState.suggestMove(square, true);
//               }
//             }
//           }
//           boardWidth={500}
//           customBoardStyle={{
//             borderRadius: '10px',
//             boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
//           }}

//           onPieceDrop={(sourceSquare, targetSquare, piece) => {
//             // Handle move logic
//             return true; // Return true to indicate a successful move
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Game;


import React, { useState, useEffect } from 'react';
import {Chessboard} from 'react-chessboard';
import { Chess } from 'chess.js';
import axios from 'axios';

// interface GameBoardProps {
//   gameId: string;
// }

const GameBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [username, setUsername] = useState('');
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const gameId = localStorage.getItem('gameId');

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/game/state/${gameId}`);
        const gameData = response.data;
        setFen(gameData.fen);
        console.log(gameData)
        setGame(new Chess(gameData.fen));
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    fetchGameState();
  }, [ gameId]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handlePieceClick = (square: string) => {
    const moves = game.moves({ square, verbose: true });
    const validMoves = moves.map(move => move.to);
    setPossibleMoves(validMoves);
  };

  const handlePieceDrop = async (sourceSquare: string, targetSquare: string): Promise<boolean> => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Always promote to a queen for simplicity
    });

    if (move === null) {
      return false;
    }

    setFen(game.fen());
    setPossibleMoves([]);

    try {
      await axios.post(`http://localhost:5000/api/game/move/${gameId}`, { from: sourceSquare, to: targetSquare });
      return true;
    } catch (error) {
      console.error('Error making move:', error);
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">{username ? `Welcome, ${username}` : 'Chess Game'}</h1>
      <div className="mb-4">
        <Chessboard
          position={fen}
          onPieceDrop={handlePieceDrop as unknown as (sourceSquare: string, targetSquare: string, piece: string) => boolean}
          onSquareClick={handlePieceClick}
          boardOrientation={username === game.turn() ? 'white' : 'black'}
          customBoardStyle={{ borderRadius: '4px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}
        />
      </div>
      {possibleMoves.length > 0 && (
        <div>
          <h3>Possible Moves:</h3>
          <ul>
            {possibleMoves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
