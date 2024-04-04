import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Modal, Button } from '@mui/material';
import CharacterSheet from '../../character/CharacterSheet'; // Ensure this path is correct

const CampaignDetails = ({ campaignId }) => {
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/campaigns/details/${campaignId}`);
        setCampaignDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Failed to fetch campaign details:', error);
        setError('Failed to load campaign details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  const handleOpenCharacterModal = async (characterId) => {
    try {
      setIsLoading(true); // Consider adding a loading state for fetching character details
      const response = await axios.get(`/api/characters/${characterId}`);
      setSelectedCharacter(response.data);
      setIsCharacterModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch character details:', error);
      // Handle error (e.g., set an error state or display a notification)
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleCloseCharacterModal = () => {
    setIsCharacterModalOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!campaignDetails) return <Box>No Campaign Details Available</Box>;

  return (
    <Box padding={2}>
      <Typography variant="h5">{campaignDetails.name}</Typography>
      <Typography variant="subtitle1">Description:</Typography>
      <Typography>{campaignDetails.description}</Typography>
      <Typography variant="subtitle1" marginTop={2}>Members:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {campaignDetails.members?.map((member, index) => (
          <Box key={index} sx={{ m: 1, cursor: 'pointer' }} onClick={() => handleOpenCharacterModal(member.character._id)}>
            <Typography variant="body2" color="text.secondary">
              {member.user.name}: {member.character?.details.name || 'No character name'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Character Detail Modal */}
      <Modal
        open={isCharacterModalOpen}
        onClose={handleCloseCharacterModal}
        aria-labelledby="character-sheet-modal"
        aria-describedby="modal-modal-description"
      >
        <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto', // Allow width to adjust based on content and padding
    maxWidth: '90vw', // Limit the width to 90% of the viewport width for responsiveness
    maxHeight: '90vh', // Limit the height to 90% of the viewport height
    overflow: 'auto', // Add scroll if content overflows
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4, // Padding around the content
    borderRadius: 2, // Optional border-radius for aesthetics
  }}
>
  {selectedCharacter && <CharacterSheet character={selectedCharacter} />}
</Box>
      </Modal>
    </Box>
  );
};

export default CampaignDetails;
