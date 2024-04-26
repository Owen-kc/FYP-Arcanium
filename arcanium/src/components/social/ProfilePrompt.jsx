import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button, Avatar, Typography, TextField, List, ListItem, ListItemText, Box, Grid} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import config from '../../config';

const ProfilePrompt = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const saveAnimationControls = useAnimation();

  // Check if the user has a profile, and show the modal if they don't
  useEffect(() => {
    const checkUserProfileExists = async () => {
      if (isAuthenticated && user) {  // Check if the user is authenticated
        try {
          const response = await axios.get(`${config.apiUrl}/api/profile-exists/${user.sub}`); // Check if the user has a profile
          setShowModal(!response.data.exists);
          setNickname(user.nickname || '');
        } catch (error) {
          console.error('Error checking user profile existence:', error);
          setShowModal(true);
        }
      }
    };
    checkUserProfileExists();
  }, [isAuthenticated, user]);

  const handleSaveProfile = async () => {
    // Trigger the save animation
    saveAnimationControls.start({
      scale: [1, 1.2, 1],
      backgroundColor: ["#1976d2", "#4caf50", "#1976d2"],
      transition: { duration: 0.5 },
    }).then(async () => {
      try {
        await axios.post(`${config.apiUrl}/api/user/profile`, {
          auth0Id: user.sub,
          nickname: nickname,
          picture: user.picture,
          name: user.name,
          email: user.email,
        });
        setShowModal(false);
      } catch (error) {
        console.error('Error saving user profile:', error);
      }
    });
  };
  
  const handleClose = () => {
    setShowModal(false);
    logout({ returnTo: window.location.origin }); // Log the user out

  };

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth disableBackdropClick disableEscapeKeyDown>
        <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
      <DialogContent>
        <Box textAlign="center" p={2}>
          <Avatar src={user.picture} alt="Profile" sx={{ width: 90, height: 90, mb: 2, mx: "auto" }} />
          <Typography variant="h6">Welcome to Arcanium, {user.name}!</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Set your public username and review your profile information:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="nickname"
            label="Username"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            margin="normal"
            sx={{ mt: 2 }}
          />
          <List>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} sm={6}>
      <ListItem>
        <ListItemText primary="Email" secondary={user?.email} />
      </ListItem>
    </Grid>
    <Grid item xs={12} sm={6}>
      <ListItem>
        <ListItemText primary="Name" secondary={user?.name} />
      </ListItem>
    </Grid>
    
  </Grid>
</List>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <motion.div initial={{ scale: 1, backgroundColor: "#1976d2" }} animate={saveAnimationControls}>
          <Button onClick={handleSaveProfile} variant="contained" color="primary">
            Save
          </Button>
        </motion.div>
      </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default ProfilePrompt;
