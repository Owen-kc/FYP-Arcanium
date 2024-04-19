import React from 'react';
import { AppBar, Toolbar, Typography, Link, Box, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import LinkedInIcon from '@mui/icons-material/LinkedIn'; 

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 1,
      }}>
        {/* Left Side - OGL and Powered by Open5e */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start', 
        }}>
          <Link href="https://api.open5e.com/" color="inherit" sx={{ fontSize: '0.75rem' }}>
            Powered by Open5e API
          </Link>
          <Link href="https://dnd.wizards.com/resources/systems-reference-document" color="inherit" sx={{ fontSize: '0.75rem' }}>
            Open Gaming License: Systems Reference Document
          </Link>
        </Box>

        {/* Center - Logos */}
        <Box sx={{ display: 'flex' }}>
          <IconButton href="mailto:ownie44@gmail.com" color="inherit" size="small">
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton href="https://github.com/Owen-kc" color="inherit" size="small">
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/owen-casey-a35963206/" color="inherit" size="small">
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <Tooltip title="So small you see #MedievalFantasyAssets by Adrian licensed under CC-BY-4.0 / Available at: https://sketchfab.com/3d-models/so-small-you-see-medievalfantasyassets-61fd315af80444a1abbe764b5fa43118">
            <IconButton color="inherit" size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Side - Copyright */}
        <Typography variant="body2" color="inherit" sx={{ fontSize: '0.75rem' }}>
          &copy; {currentYear} Arcanium. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
