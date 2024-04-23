import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Menu, MenuItem, IconButton, Avatar, Dialog } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Profile from './Profile';

const UserMenu = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfileDialog = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  const closeProfileDialog = () => {
    setProfileDialogOpen(false);
  };

  const handleLogout = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // You can default to 'window.location.origin' if REACT_APP_BASE_URL isn't set for some reason
    const returnToUrl = isProduction && process.env.REACT_APP_BASE_URL
      ? process.env.REACT_APP_BASE_URL
      : window.location.origin;
  
    logout({ returnTo: returnToUrl });
    handleClose();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar src={user.picture} alt={user.name} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={openProfileDialog}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <Dialog open={profileDialogOpen} onClose={closeProfileDialog}>
            <Profile />
          </Dialog>
        </>
      ) : (
        <Button color="inherit" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      )}
    </>
  );
}

export default UserMenu;
