import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Box, Drawer, List, ListItem, Collapse, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UserMenu from './UserMenu';
import logo from '../images/Arcanium-logo.png'; // Assuming your logo is in the images folder

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCompendium, setOpenCompendium] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    handleClose();
    setMobileOpen(!mobileOpen);
  };

  const toggleCompendium = (event) => {
    // Stop event propagation to prevent the drawer toggle from being triggered
    event.stopPropagation();
    setOpenCompendium(!openCompendium);
  };
  

  const activeStyle = {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText, 
    borderRadius: '4px' 
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 'auto' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <img src={logo} alt="Arcanium" style={{ height: 80, margin: '0 auto', display: 'block' }} />
        <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
          Arcanium
        </Typography>
      </Box>
      <List>
        <ListItem button component={NavLink} to="/" exact style={({ isActive }) => isActive ? activeStyle : undefined}>Home</ListItem>
        <ListItem button component={NavLink} to="/create-character" style={({ isActive }) => isActive ? activeStyle : undefined}>Characters</ListItem>
        <ListItem button component={NavLink} to="/dungeon" style={({ isActive }) => isActive ? activeStyle : undefined}>Dungeon</ListItem>
        <ListItem button component={NavLink} to="/friends" style={({ isActive }) => isActive ? activeStyle : undefined}>Friends</ListItem>
        <ListItem button component={NavLink} to="/campaigns" style={({ isActive }) => isActive ? activeStyle : undefined}>Campaigns</ListItem>
        <ListItem button onClick={toggleCompendium}>
          Compendium {openCompendium ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCompendium} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/monsters" style={({ isActive }) => isActive ? activeStyle : undefined}>Monsters</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/spells" style={({ isActive }) => isActive ? activeStyle : undefined}>Spells</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/items" style={({ isActive }) => isActive ? activeStyle : undefined}>Items</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/armor" style={({ isActive }) => isActive ? activeStyle : undefined}>Armor</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/weapons" style={({ isActive }) => isActive ? activeStyle : undefined}>Weapons</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/feats" style={({ isActive }) => isActive ? activeStyle : undefined}>Feats</ListItem>
            <ListItem button sx={{ pl: 4 }} component={NavLink} to="/backgrounds" style={({ isActive }) => isActive ? activeStyle : undefined}>Backgrounds</ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={logo} alt="Arcanium" style={{ height: 80 }} />
            <Typography variant="h6" sx={{ ml: 2 }}>Arcanium</Typography>
          </Box>
        )}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={NavLink} to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>Home</Button>
            <Button color="inherit" component={NavLink} to="/create-character" style={({ isActive }) => isActive ? activeStyle : undefined}>Characters</Button>
            <Button color="inherit" component={NavLink} to="/dungeon" style={({ isActive }) => isActive ? activeStyle : undefined}>Dungeon</Button>
            <Button color="inherit" component={NavLink} to="/friends" style={({ isActive }) => isActive ? activeStyle : undefined}>Friends</Button>
            <Button color="inherit" component={NavLink} to="/campaigns" style={({ isActive }) => isActive ? activeStyle : undefined}>Campaigns</Button>
            <Button color="inherit" onMouseEnter={handleMenuOpen}>
              Compendium <ArrowDropDownIcon />
            </Button>
          </Box>
        )}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}
        >
          {drawer}
        </Drawer>
        <Box sx={{ marginLeft: 'auto' }}>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
