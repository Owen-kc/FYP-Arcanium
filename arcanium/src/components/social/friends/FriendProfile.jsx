import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Divider, Avatar, Modal, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from 'framer-motion';
import { fetchCharactersByUserId } from '../../FetchCharacters';
import CharacterSheet from '../../character/CharacterSheet';
import Alert from '@mui/material/Alert';


const FriendProfile = () => {
  const theme = useTheme();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth0Id } = useParams();
  const decodedAuth0Id = decodeURIComponent(auth0Id);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [alert, setAlert] = useState({ severity: '', message: '' });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profile/${decodedAuth0Id}`);
        setProfileData(response.data);
      } catch (error) {
        setAlert({ severity: 'error', message: 'Error fetching profile data.' });
      } finally {
        setLoading(false);
      }
    };

    const fetchFriends = async () => {
      try {
        const friendsResponse = await axios.get(`/api/friends/list-friends/${decodedAuth0Id}`);
        setFriends(friendsResponse.data);
        console.log(friendsResponse.data); 
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const fetchCharacters = async () => {
        try {
          const charactersData = await fetchCharactersByUserId(decodedAuth0Id);
          setCharacters(charactersData);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      };
      fetchCharacters();
      fetchFriends();
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
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default}>
      <Box width="100%" maxWidth="600px" display="flex" flexDirection="column" alignItems="center" p={2} borderRadius={2}>

        {/* Display the alert here */}
      {alert.message && (
        <Box my={2}>
          <Alert 
            severity={alert.severity}
            onClose={() => setAlert({ severity: '', message: '' })}
          >
            {alert.message}
          </Alert>
        </Box>
      )}

        {/* User Info Section with Back Arrow */}
        <Box position="relative" width="100%">
            {/* Back Arrow */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
            >
              <IconButton onClick={goBack} style={{ color: theme.palette.text.primary }}>
                <ArrowBackIosIcon />
              </IconButton>
            </motion.div>
        {/* User Info Section */}
        <Card sx={{ mb: 2, bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center', boxShadow: 3 }}>
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color={theme.palette.text.primary}>
              User Info
            </Typography>
            <Divider style={{ backgroundColor: theme.palette.primary.main, marginBottom: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main, width: 100, height: 100, fontSize: '3rem' }}
                src={profileData.picture}
                alt={`${profileData.name}'s profile picture`}
              >
                {profileData.picture ? '' : profileData.name ? profileData.name[0] : 'U'}
              </Avatar>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  <strong>Name:</strong> {profileData.name}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  <strong>Email:</strong> {profileData.email}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Nickname:</strong> {profileData.nickname}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </Box>

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
      width: 'auto', 
      maxWidth: '100%', 
      maxHeight: '90vh', 
      overflowY: 'auto',
      bgcolor: 'background.paper', 
      boxShadow: 24, 
      p: 4, 
      borderRadius: 2, 
    }}
  >
    <CharacterSheet character={selectedCharacter} />
  </Box>
</Modal>

        {/* Friends Section */}
        <Card sx={{ bgcolor: theme.palette.background.paper, width: '100%', textAlign: 'center' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" color={theme.palette.text.primary}>
              Friends
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {friends.length > 0 ? friends.map((friend) => (
                <Box key={friend._id} sx={{ m: 1 }}>
                  <Avatar src={friend.requester.picture || friend.recipient.picture} sx={{ width: 56, height: 56 }} />
                  <Typography variant="body2" color="text.secondary">
                    {friend.requester.name || friend.recipient.name}
                  </Typography>
                </Box>
              )) : <Typography variant="body2" color="text.secondary">No friends to display.</Typography>}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
    </motion.div>
  );
};

export default FriendProfile;
