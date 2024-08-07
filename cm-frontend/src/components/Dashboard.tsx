// // src/components/Dashboard.tsx
// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Container, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Dashboard: React.FC = () => {
//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate();
//   // const username = localStorage.getItem('username');

//   const handleLogout = () => {
//     authContext?.logout();
//     navigate('/login');
//   };


//   const handleStartGame = () => {
//     navigate('/game');
//   };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <Container maxWidth="sm" className="bg-gray-800 text-white p-8 rounded-lg shadow-lg" >
//         {/*header to show the dashboard  */}
//         <Typography variant="h4" className="text-center mt-4 text-white">Dashboard</Typography>
//         <Typography variant="h6" className=" text-center mt-4 text-white  ">
//           Welcome, {authContext?.username}
//         </Typography>
//         <Typography variant="body1" className="text-center mt-4">
//           This is a dashboard
//         </Typography>
//         {/* button to start game  */}
//         <Button
//           variant="contained" color="primary" onClick={handleStartGame} className=" py-2 mt-4  ">
//           Start Game
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleLogout} className="mt-4">
//           Logout
//         </Button>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import StartGame from './atoms/StartGame';


const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  // const [gameId, setGameId] = useState<string | null>(null);
  // const [isWaiting, setIsWaiting] = useState(false);

  const handleLogout = () => {
    authContext?.logout();
    navigate('/login');
  };

  // const handleStartGame = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/game', { player1: username, player2: 'waiting' });
  //     setGameId(response.data._id);
  //     setIsWaiting(true);
  //   } catch (error) {
  //     console.error('Error starting game:', error);
  //   }
  // };

  // useEffect(() => {
  //   // if (isWaiting && gameId) {
  //     const interval = setInterval(async () => {
  //       try {
  //         // gameId = localStorage.getItem('gameId');
  //         setGameId(localStorage.getItem('gameId'));
  //         const response = await axios.get(`http://localhost:5000/api/game/state/${gameId}`);
  //         if (response.data.status === 'ongoing') {
  //           // setIsWaiting(false);
  //           navigate(`/game`);
  //         }
  //       } catch (error) {
  //         console.error('Error checking game status:', error);
  //       }
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   // }
  // }, [ gameId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Container maxWidth="sm" className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <Typography variant="h4" className="text-center mt-4 text-white">Dashboard</Typography>
        <Typography variant="h6" className="text-center mt-4 text-white">Welcome, {username}!</Typography>
        <Typography className="text-center mt-4">This is a dashboard</Typography>

        {/* <Button
          variant="contained"
          color="primary"
          className="w-full py-2 mt-4"
          onClick={handleStartGame}
          disabled={isWaiting}
        >
          Start a Game
        </Button> */}
        
        <StartGame />
{/* 
        {isWaiting && (
          <div className="flex justify-center mt-4">
            <CircularProgress color="secondary" />
          </div>
        )} */}

        <Button variant="contained" color="primary" onClick={handleLogout} className="mt-4">
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
