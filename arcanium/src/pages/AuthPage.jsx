import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm'; // Adjust the import path as needed
import LoginForm from '../components/LoginForm'; // Adjust the import path as needed

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <button onClick={toggleForm}>
        {showLogin ? 'Register' : 'Login'}
      </button>
      <h2>{showLogin ? 'Login' : 'Register'}</h2>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
