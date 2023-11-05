import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Arcanium
        </Typography>
        <Button color="inherit" component={NavLinkAdapter} to="/">Home</Button>
        <Button color="inherit" onMouseEnter={handleOpen}>
          Compendium <IconButton size="small" color="inherit"><ArrowDropDownIcon /></IconButton>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onMouseLeave={handleClose}
        >
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/monsters">Monsters</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/spells">Spells</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/items">Items</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/armor">Armor</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/weapons">Weapons</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/feats">Feats</MenuItem>
          <MenuItem onClick={handleClose} component={NavLinkAdapter} to="/backgrounds">Backgrounds</MenuItem>
          {/* Add more links as needed */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const NavLinkAdapter = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

export default Header;
