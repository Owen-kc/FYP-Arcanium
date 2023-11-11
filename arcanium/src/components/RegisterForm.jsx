import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data);
      // Handle response / redirect user
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
