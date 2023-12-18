import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Grid, Typography, Container, Paper, useMediaQuery } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import backgroundImage from '../images/bg4.jpeg'; 
import FantasyTheme from '../components/FantasyTheme';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  const style = {
    container: {
      height: '100vh',
      ...(matchesMD && {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }),
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      p: 4,
      backgroundColor: matchesMD ? 'transparent' : 'background.paper',
      color: matchesMD ? 'common.white' : 'text.primary',
      backdropFilter: matchesMD ? 'blur(5px)' : 'none',
      height: matchesMD ? '100%' : 'auto',
    },
    enterButton: {
      fontSize: '1.5rem',
      padding: '15px 60px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      backgroundColor: 'primary.main',
      color: 'common.white',
      borderRadius: '20px',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,0.5)',
      '&:hover': {
        backgroundColor: 'primary.dark',
      },
      margin: matchesMD ? '0' : '20px 0',
    },
  };

  return (
    <ThemeProvider theme={FantasyTheme}>
      <Grid container sx={style.container}>

        {/* Information Section */}
        {!matchesMD && (
          <Grid item xs={12} sx={style.contentBox}>
            <Typography variant="h2" component="h1" gutterBottom>
              Arcanium
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Begin your journey into the world of D&D
            </Typography>
            <Button variant="contained" onClick={() => loginWithRedirect()} sx={style.enterButton}>
              Enter Arcanium
            </Button>
          </Grid>
        )}

        {/* Background Section - Only visible on md screens and up */}
        {matchesMD && (
          <Grid item md={6} sx={style.contentBox}>
            <Typography variant="h2" component="h1" gutterBottom>
              Arcanium
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Begin your journey into the world of D&D
            </Typography>
            <Button variant="contained" onClick={() => loginWithRedirect()} sx={style.enterButton}>
              Enter Arcanium
            </Button>
          </Grid>
        )}

      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
