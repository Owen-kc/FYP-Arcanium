import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { fetchCharactersByUserId } from '../../FetchCharacters';

const CampaignInvitations = ({ userId }) => {
    const [invitations, setInvitations] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // Use Auth0Id, adjusted to match your backend
    const [currentCampaignId, setCurrentCampaignId] = useState(null);

    useEffect(() => {
        const fetchInvitations = async () => {
            console.log("Fetching invitations...");
            try {
                const invitationRes = await axios.get(`/api/campaigns/invitations/${userId}`);
                console.log("Invitations:", invitationRes.data); // Log the received data here
                setInvitations(invitationRes.data);
            } catch (error) {
                console.error('Error fetching invitations:', error);
            }
        };
        

        const fetchCharacters = async () => {
            try {
                
                const charactersData = await fetchCharactersByUserId(userId); // Use the userId prop directly
                setCharacters(charactersData);
                console.log(charactersData)
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchInvitations();
        fetchCharacters();
    }, [userId]);

    const handleOpen = (campaignId) => {
        console.log("Opening dialog for campaign ID:", campaignId);
        setCurrentCampaignId(campaignId);
        setOpenDialog(true);
    };

    const handleClose = () => {
        console.log("Closing dialog...");
        setOpenDialog(false);
    };

    const handleAccept = async () => {
        if (!selectedCharacterId) {
            alert("Please select a character.");
            return;
        }
        try {
            await axios.post('/api/campaigns/accept-invitation', {
                campaignId: currentCampaignId,
                userAuth0Id: userId, // Use Auth0Id, adjusted to match your backend
                characterId: selectedCharacterId,
            });
            // Update UI accordingly
            setInvitations(invitations.filter(inv => inv._id !== currentCampaignId)); // Adjust based on your data structure
            handleClose();
        } catch (error) {
            console.error('Error accepting invitation', error);
            alert("Failed to accept invitation.");
        }
    };
    

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
            {invitations.map((invitation) => (
    <ListItem key={invitation._id} secondaryAction={
        <Button onClick={() => handleOpen(invitation._id)}> {/* Adjusted to invitation._id */}
            Accept
        </Button>
    }>
        <ListItemText primary={invitation.name} secondary={invitation.description} />
    </ListItem>
))}

            </List>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Select a Character</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Character</InputLabel>
                        <Select
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAccept}>Accept Invitation</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CampaignInvitations;
