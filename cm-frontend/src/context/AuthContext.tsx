// // src/context/AuthContext.tsx
// import React, { createContext, useState, ReactNode, useEffect } from 'react';


// interface AuthContextType {
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   isAuthenticated: () => boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (token: string) => {
//     setToken(token);
//     localStorage.setItem('token', token);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   const isAuthenticated = () => !!token;

//   return (
//     <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };

// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
// import axios from 'axios';

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUsername(localStorage.getItem('username'));
      // fetchUsername(storedToken);
    }
  }, []);

  // const fetchUsername = async (token: string) => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/auth/me', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUsername(response.data.username);
  //   } catch (error) {
  //     console.error('Failed to fetch username:', error);
  //   }
  // };

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    setUsername(localStorage.getItem('username'));
    // fetchUsername(token);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
