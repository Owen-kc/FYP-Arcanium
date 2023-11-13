// src/pages/Login.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login (to be implemented)
  const handleLogin = () => {
    // TODO: Perform login
  };

  return (
    <div>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default Login;
