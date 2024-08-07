// src/components/StartGame.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Game {
  _id: string;
  player1: string;
  player2?: string;
  status: string;
  moves: string[];
  fen? : string;
}

const StartGame: React.FC = () => {
  // const [username, setUsername] = useState('');
  const [game, setGame] = useState(null);
//  const [gameId, setGameId] = useState<string | null>(null);
 let gameId: string | null;
 const username = localStorage.getItem('username');
  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/game', { username });
      setGame(response.data);
      // setGameId(response.data._id);
      gameId = response.data._id;
      localStorage.setItem('gameId', response.data._id);

    } catch (error) {
      console.error('Error starting game:', error);
    }
  };
  
  gameId = localStorage.getItem('gameId');
  useEffect(()=> {
    if (gameId) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/game/state/${gameId}`);
          if (response.data.status === 'ongoing') {
            clearInterval(interval);
            window.location.href = `/game`;
            // call the game component and pass the prop gameid
            
          }
        } catch (error) {
          console.error('Error checking game status:', error);
        }
      }, 3000);
    }
  } , [ gameId ]);

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <button onClick={startGame}>Start Game</button>
      {(game as unknown as Game) && (
        <div>
          <p>Game ID: {(game as unknown as Game)._id}</p>
          <p>Player 1: {(game as unknown as Game).player1}</p>
          {(game as unknown as Game).player2 ? <p>Player 2: {(game as unknown as Game).player2}</p> : <p>Waiting for player 2...</p>}
        </div>
      )}
    </div>
  );
};

export default StartGame;
