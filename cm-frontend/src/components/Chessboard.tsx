import React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const chess = new Chess();

const ChessboardComponent: React.FC = () => {
    return (
        <div className="w-full h-full p-4 bg-gray-100">
          <Chessboard position={chess.fen()} />
        </div>
      );
      
};

export default ChessboardComponent;
