import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);
            console.log('Token stored:', response.data.token);
            onLogin(); // Call parent onLogin function
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
