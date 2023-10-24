import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Arcanium
        </Typography>
        <Button color="inherit" component={NavLinkAdapter} to="/">Home</Button>
        <Button color="inherit" component={NavLinkAdapter} to="/monsters">Monsters</Button>
        {/* Add more links as needed */}
      </Toolbar>
    </AppBar>
  );
}

// Adapter for NavLink to work smoothly with MUI's Button
const NavLinkAdapter = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

export default Header;
