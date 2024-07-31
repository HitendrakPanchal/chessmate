// src/components/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, username, email, password });
            setMessage(response.data.message);
            console.log(response.data);
            navigate('/login');

        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setMessage((error as any).response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Container maxWidth="sm" className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
            <Typography variant="h4" className="text-center mt-4 text-white">Register</Typography>
            <form onSubmit={handleRegister} className="mt-4 space-y-4">
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 text-white"
                    InputLabelProps={{ className: 'text-gray-100' }}
                    InputProps={{ className: 'text-white' }}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-700 text-white"
                    InputLabelProps={{ className: 'text-gray-900' }}
                    InputProps={{ className: 'text-white' }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 text-white"
                    InputLabelProps={{ className: 'text-gray-300' }}
                    InputProps={{ className: 'text-white' }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 text-white"
                    InputLabelProps={{ className: 'text-gray-300' }}
                    InputProps={{ className: 'text-white' }}
                />
                <Button variant="contained" color="primary" type="submit" className="w-full py-2 mt-4">Register</Button>
            </form>
            {message && <Typography className="text-center mt-4 text-red-500">{message}</Typography>}
            <Typography className="text-center mt-4">Already have an account?</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/login')} className="w-full py-2 mt-2">Login</Button>
        </Container>
    </div>
    );
};

export default Register;
