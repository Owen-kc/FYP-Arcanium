import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UserMenu from './UserMenu';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Arcanium
        </Typography>
        <Button color="inherit" component={NavLinkAdapter} to="/">Home</Button>
        <Button color="inherit" component={NavLinkAdapter} to="/create-character">Characters</Button>
        <Button color="inherit" component={NavLinkAdapter} to="/dungeon">Dungeon</Button>
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
          {/* Add more links */}
        </Menu>
        <Box style={{ marginLeft: 'auto' }}>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const NavLinkAdapter = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

export default Header;
