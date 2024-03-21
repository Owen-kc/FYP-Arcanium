import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Divider, Avatar, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchCharactersByUserId } from '../../FetchCharacters'; // Update the path
import CharacterSheet from '../../character/CharacterSheet'; // Update the path

const FriendProfile = () => {
  const theme = useTheme();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth0Id } = useParams();
  const decodedAuth0Id = decodeURIComponent(auth0Id);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profile/${decodedAuth0Id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Optionally set an error state here to display an error message
      } finally {
        setLoading(false);
      }
    };

    const fetchCharacters = async () => {
        try {
          const charactersData = await fetchCharactersByUserId(decodedAuth0Id);
          setCharacters(charactersData);
        } catch (error) {
          console.error('Error fetching characters:', error);
          // Optionally set an error state here to display an error message
        }
      };
      fetchCharacters();
    fetchProfileData();
  }, [decodedAuth0Id]);

  const handleOpenCharacterModal = (character) => {
    setSelectedCharacter(character);
    setIsCharacterModalOpen(true);
  };

  const handleCloseCharacterModal = () => {
    setIsCharacterModalOpen(false);
  };

  if (loading) return <CircularProgress color="secondary" />;

  if (!profileData) return <Typography variant="body1" color="text.secondary">Profile not found.</Typography>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default}>
    <Box width="100%" maxWidth="600px" display="flex" flexDirection="column" alignItems="center" p={2} borderRadius={2}>
      {/* User Info Section */}
      <Card sx={{ mb: 2, bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center', boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" color={theme.palette.text.primary} sx={{ mb: 2 }}>
            User Info
          </Typography>
          <Divider style={{ backgroundColor: theme.palette.primary.main, marginBottom: 3 }} />
          <Box sx={{ position: 'relative', mb: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 100, height: 100, fontSize: '3rem', margin: 'auto' }}>
              {profileData.name ? profileData.name[0] : 'U'}
            </Avatar>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" marginLeft={3}>
            <Typography variant="body1" color="text.primary" gutterBottom>
              <strong>Name:</strong> {profileData.name}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              <strong>Email:</strong> {profileData.email}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              <strong>Nickname:</strong> {profileData.nickname}
            </Typography>
          </Box>
        </CardContent>
      </Card>

        {/* Characters Section */}
      <Card sx={{ mb: 2, bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center' }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color={theme.palette.text.primary}>
            Characters
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {characters.map((character) => (
              <Box key={character._id} sx={{ m: 1, cursor: 'pointer' }} onClick={() => handleOpenCharacterModal(character)}>
                <Avatar src={character.details.image} alt={character.details.name} sx={{ width: 56, height: 56 }} />
                <Typography variant="body2" color="text.secondary">
                  {character.details.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Character Sheet Modal */}
      <Modal
  open={isCharacterModalOpen}
  onClose={handleCloseCharacterModal}
  aria-labelledby="character-sheet-modal"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      outline: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto', // Adjust width as needed
      maxWidth: '100%', // Ensure it does not exceed the viewport width
      maxHeight: '90vh', // Prevent the modal from being taller than the viewport
      overflowY: 'auto', // Allow internal scrolling if needed
      bgcolor: 'background.paper', // Use the theme's paper color for background
      boxShadow: 24, // Apply shadow for depth perception
      p: 4, // Padding around the content
      borderRadius: 2, // Match the theme's border radius
    }}
  >
    <CharacterSheet character={selectedCharacter} />
  </Box>
</Modal>

        {/* Joined Campaigns Section Placeholder */}
        <Card sx={{ mb: 2, bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" color={theme.palette.text.primary}>
              Joined Campaigns
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Placeholder for joined campaigns data...
            </Typography>
          </CardContent>
        </Card>

        {/* Friends Section Placeholder */}
        <Card sx={{ bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" color={theme.palette.text.primary}>
              Friends
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              Placeholder for friends list...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FriendProfile;
