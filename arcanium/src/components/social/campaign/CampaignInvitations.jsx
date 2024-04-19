import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  List,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery, 
  DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { fetchCharactersByUserId } from '../../FetchCharacters';
import CustomAlert from '../CustomAlert'; 

const CampaignInvitations = ({ userId }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [invitations, setInvitations] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  useEffect(() => {
    const fetchInvitations = async () => {
      console.log("Fetching invitations...");
      try {
        const invitationRes = await axios.get(`/api/campaigns/invitations/${userId}`);
        setInvitations(invitationRes.data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
        setAlert({ open: true, message: 'Failed to fetch invitations.', severity: 'error' });
      }
    };

    const fetchCharacters = async () => {
      try {
        const charactersData = await fetchCharactersByUserId(userId);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setAlert({ open: true, message: 'Failed to fetch characters.', severity: 'error' });
      }
    };

    fetchInvitations();
    fetchCharacters();
  }, [userId]);

  const handleOpen = (campaignId) => {
    setCurrentCampaignId(campaignId);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAccept = async () => {
    if (!selectedCharacterId) {
      setAlert({ open: true, message: 'Please select a character.', severity: 'warning' });
      return;
    }
    try {
      await axios.post('/api/campaigns/accept-invitation', {
        campaignId: currentCampaignId,
        userAuth0Id: userId, 
        characterId: selectedCharacterId,
      });
      setInvitations(invitations.filter(inv => inv._id !== currentCampaignId));
      handleClose();
    } catch (error) {
      console.error('Error accepting invitation', error);
      setAlert({ open: true, message: 'Failed to accept invitation.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <List>
        {invitations.length > 0 ? (
          invitations.map((invitation) => (
            <motion.div
              key={invitation._id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ mb: 1 }}>
                <CardActionArea onClick={() => handleOpen(invitation._id)}>
                  <CardContent>
                    <Typography variant="h6">{invitation.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {invitation.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          ))
        ) : (
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            No campaign invitations available.
          </Typography>
        )}
      </List>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Select a Character"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="character-select-label">Character</InputLabel>
            <Select
              labelId="character-select-label"
              id="character-select"
              value={selectedCharacterId}
              label="Character"
              onChange={(e) => setSelectedCharacterId(e.target.value)}
            >
              {characters.map((character) => (
                <MenuItem key={character._id} value={character._id}>
                  {character.details.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
    </Box>
  );
};

export default CampaignInvitations;
