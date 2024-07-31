// src/components/MoveList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoveList: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [moves, setMoves] = useState<any[]>([]);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/move/${gameId}`);
        setMoves(response.data);
      } catch (error) {
        console.error('Error fetching moves:', error);
      }
    };
    fetchMoves();
  }, [gameId]);

  return (
    <div className="move-list">
      <h2 className="text-xl font-bold mb-4">Move List</h2>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>
            {move.player}: {move.move}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveList;
