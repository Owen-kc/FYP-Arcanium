import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchCharactersByUserId } from '../FetchCharacters'; 
import { Box, Typography, Card, CardContent, Avatar, CircularProgress, Modal, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; 
import CharacterSheet from './CharacterSheet';
import { useLocation } from 'react-router-dom';

const UserCharacters = () => {
  const { user } = useAuth0();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  const location = useLocation(); 
  const newCharacterId = location.state?.newCharacterId;

  const cardAnimation = {
    new: { scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } },
    normal: { scale: 1 }
  };

  useEffect(() => {
    const loadCharacters = async () => {
      if (user?.sub) {
        try {
          const chars = await fetchCharactersByUserId(user.sub);
          setCharacters(chars);
        } catch (error) {
          console.error('Error fetching characters:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCharacters();
  }, [user?.sub]);

  const handleOpenCharacterModal = (character) => {
    setSelectedCharacter(character);
    setIsCharacterModalOpen(true);
  };

  const handleCloseCharacterModal = () => {
    setIsCharacterModalOpen(false);
  };

  if (loading) return <CircularProgress />;

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <Box sx={{
      mt: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px', // maximum width of the content
      mx: 'auto',
      p: 2, 
      color: 'text.primary',
      bgcolor: 'background.default', 
    }}>
      <Typography variant="h2" sx={{ mb: 1, textAlign: 'center' }}>
        My Characters
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
        You have <span style={{ color: 'secondary.main', fontWeight: 'bold' }}>{characters.length}</span> created character{characters.length !== 1 ? 's' : ''}
      </Typography>
      <AnimatePresence>
        <Grid container spacing={2} justifyContent="center">
          {characters.length > 0 ? (
            characters.map((character) => (
              <Grid item key={character._id} xs={12} sm={6} md={4} lg={3}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  <Card sx={{ width: '100%', minHeight: '150px', mb: 2, bgcolor: 'primary.dark', color: 'white', ':hover': { boxShadow: 6 } }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} onClick={() => handleOpenCharacterModal(character)}>
                      <Avatar src={character.details.image} alt={character.details.name} sx={{ width: 56, height: 56, mr: 2 }} />
                      <Typography variant="h6" sx={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{character.details.name}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>No characters found.</Typography>
          )}
        </Grid>
      </AnimatePresence>
  
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
          {selectedCharacter && <CharacterSheet character={selectedCharacter} />}
        </Box>
      </Modal>
    </Box>
  );
  
};

export default UserCharacters;
