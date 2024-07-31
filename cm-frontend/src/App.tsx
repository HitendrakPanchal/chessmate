// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Game from './components/Game';
// import Chat from './components/Chat';
// import MoveList from './components/MoveList';
// import Register from './components/Register';
// import Login from './components/Login';
// import { AuthProvider } from './context/AuthContext';
// import SomeComponent from './components/SomeComponent';

// const App: React.FC = () => {
//   return (
//     <>
    

//       <Router>
//         <div className="App">
//           <Header />
//           <Routes>
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />

//             <Route path="/game/:gameId" element={<Game />} />
//             {/* <Route path="/chat/:gameId" Component={Chat({ gameId: '60c72b2f9b1e8a4b4c8b4567' })} /> */}
//             <Route path="/chat/:gameId" element={<Chat gameId="60c72b2f9b1e8a4b4c8b4567" />} />
//             <Route path="/moves/:gameId" element={<MoveList gameId="60c72b2f9b1e8a4b4c8b4567" />} />
//             <Route path="/" Component={() => <div>Welcome to ChessMate</div>} />


            
//           </Routes>
//         </div>
//       </Router>

//       <AuthProvider>
//         <Router>
//           <Routes>
// <Route path='/some-component' element={<SomeComponent />} />

//           </Routes>

//         </Router>
//       </AuthProvider>
 
//     </>
//   );
// };

// export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Example protected component
import PrivateRoute from './components/PrivateRoute';
// import SomeComponent from './components/SomeComponent';
import Register from './components/Register';
import Game from './components/Game';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Register} />
          <Route path="/login" Component={Login} />


          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* add game route */}
          <Route path='/game' element={<Game />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
