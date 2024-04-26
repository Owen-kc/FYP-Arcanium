import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CharacterSheet from './CharacterSheet';
import axios from 'axios';
import { Button, Box } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function ReviewAndSubmit({ character }) {
  const { user } = useAuth0();
  const userId = user?.sub;
  const navigate = useNavigate();

  // Function to get a presigned URL from the server and upload the image to S3
  const getPresignedUrlAndUpload = async (file) => {
    const presignResponse = await axios.get(`${config.apiUrl}/api/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
    const presignedUrl = presignResponse.data.url;
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return presignedUrl.split('?')[0];
  };

  // Function to handle the character submission
  const handleSubmit = async () => {
    let imageUrl = character.details.image;
    
    if (imageUrl instanceof File) {
      imageUrl = await getPresignedUrlAndUpload(imageUrl);
    }

    // Format the speed property based on the character's speed type, spells array
    const formattedSpeed = typeof character.speed === 'object' ? `Walk: ${character.speed.walk} feet` : character.speed;
    const spellNames = character.spells.map(spell => typeof spell === 'object' ? spell.name : spell);

    // Create a new character object with the formatted data
    const characterData = {
      ...character,
      userId,
      speed: formattedSpeed,
      spells: spellNames,
      details: {
        ...character.details,
        image: imageUrl,
      },
      name: character.details.name,
      backstory: character.details.backstory,
      height: character.details.height,
      weight: character.details.weight,
      hairColor: character.details.hairColor,
      eyeColor: character.details.eyeColor,
      alignment: character.details.alignment,
      background: character.background,
      proficiencyBonus: character.proficiencyBonus,
      abilityScores: character.abilityScores,
      skills: character.skills,
      equipment: character.equipment,
    };

    // Send a POST request to the server to create the character
    try {
      const response = await axios.post(`${config.apiUrl}/api/characters`, characterData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Character created:', response.data);
      navigate('/characters', { state: { newCharacterId: response.data._id } });
    } catch (error) {
      console.error('There was a problem with the character submission:', error);
    }
  };

  return (
    <Box sx={{
      '@media (max-width:600px)': {
        paddingLeft: '70px', // Add padding on mobile to shift content right
      }
    }}>
      <CharacterSheet character={character} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Character
        </Button>
      </Box>
    </Box>
  );
}

export default ReviewAndSubmit;
