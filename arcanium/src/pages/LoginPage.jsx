import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography, Button, useMediaQuery, Box } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import desktopBackgroundImage from '../images/bg4.jpeg';
import mobileBackgroundImage from '../images/mobile-bg.jpg';
import FantasyTheme from '../components/FantasyTheme';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ThemeProvider theme={FantasyTheme}>
      <Grid container sx={{
        height: '100vh',
        backgroundImage: `url(${matchesMD ? desktopBackgroundImage : mobileBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', 
      }}>
        {/* Blur Overlay */}
        {matchesMD && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%', 
            height: '100%',
            backdropFilter: 'blur(8px)',
            zIndex: 1, 
          }} />
        )}
        <Grid item xs={12} md={6} sx={{
          position: 'relative', 
          zIndex: 2, // Above the blur overlay
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: matchesMD ? 'flex-start' : 'center',
          textAlign: matchesMD ? 'left' : 'center',
          padding: matchesMD ? '4rem' : '2rem',
          color: theme.palette.common.white,
          height: '100%',
          ml: matchesMD ? '10vw' : 0,
        }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{
  textShadow: '6px 2px 8px rgba(0,0,0,1.5)', // Adds shadow to text for better contrast
}}>
  Arcanium
</Typography>
<Typography variant="subtitle1" gutterBottom sx={{
  textShadow: '6px 2px 8px rgba(0,0,0,0.1.5)', 
}}>
  Begin your journey into the world of Dungeons & Dragons
</Typography>
          <Button variant="contained" onClick={loginWithRedirect} sx={{
            fontSize: '1.5rem',
            padding: '15px 60px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: '20px',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            marginTop: '20px',
          }}>
            Enter Arcanium
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
