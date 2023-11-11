import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      console.log(response.data);
      // Handle response / redirect user
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
