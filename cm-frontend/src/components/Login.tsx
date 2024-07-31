// src/components/Login.tsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('username', username);
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = response.data;
      authContext?.login(token);  // Store the token
      setMessage('Login successful');
      console.log(response.data);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMessage((error as any).response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <Container maxWidth="sm" className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <Typography variant="h4" className="text-center mt-4">Login</Typography>
      <form onSubmit={handleLogin} className="mt-4">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" className="w-full mt-4">Login</Button>
      </form>
      {/* Register if not signed up */}
      <Typography className="text-center mt-4">Don't have an account? <a href="/">Register</a></Typography>

      {message && <Typography className="text-center mt-4">{message}</Typography>}
    </Container>
  </div>
  );
};

export default Login;
