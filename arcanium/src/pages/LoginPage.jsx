import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../images/background.jpg';
import FantasyTheme from '../components/FantasyTheme';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <ThemeProvider theme={FantasyTheme}>
      <Grid container sx={{ height: '100vh' }}>
        
    
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          p: 4, // Padding for the content
        }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Arcanium
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            **add app information**
          </Typography>
         
        </Grid>
        
        
        <Grid item xs={12} md={6} sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
        }}>
          <Button
            variant="contained"
            onClick={() => loginWithRedirect()}
            sx={{
              fontSize: '1.5rem',
              padding: '15px 60px',
            }}
          >
            Enter Arcanium
          </Button>
        </Grid>
        
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
