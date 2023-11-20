import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Welcome to Arcanium</h1>
      <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
    </div>
  );
};

export default LoginPage;
