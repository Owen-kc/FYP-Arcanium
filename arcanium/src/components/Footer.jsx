import React from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main, // Use the primary color from the theme
        color: theme.palette.secondary.main, // Use the secondary color from the theme
        p: 3,
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="inherit" align="center">
          &copy; {currentYear} Arcanium. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
