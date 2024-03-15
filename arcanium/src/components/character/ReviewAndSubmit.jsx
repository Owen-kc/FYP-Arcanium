import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CharacterSheet from './CharacterSheet';
import axios from 'axios';

function ReviewAndSubmit({ character }) {
  const { user } = useAuth0();
  const userId = user?.sub;

  const getPresignedUrlAndUpload = async (file) => {
    // Request a pre-signed URL from your server
    const presignResponse = await axios.get(`http://localhost:5000/api/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`);
    const presignedUrl = presignResponse.data.url;

    // Use the pre-signed URL to upload the file to S3
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    return presignedUrl.split('?')[0];
  };

  const handleSubmit = async () => {
    let imageUrl = character.details.image;
    
    if (imageUrl instanceof File) {
      imageUrl = await getPresignedUrlAndUpload(imageUrl);
    }

    const formattedSpeed = typeof character.speed === 'object' ? `Walk: ${character.speed.walk} feet` : character.speed;
    const spellNames = character.spells.map(spell => typeof spell === 'object' ? spell.name : spell);

    const characterData = {
      ...character,
      userId,
      speed: formattedSpeed, // Use the formatted speed string
      spells: spellNames, // Use the array of spell names
      details: {
        ...character.details,
        image: imageUrl, // Include the S3 image URL
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

    try {
      console.log('Submitting character data:', characterData);
      const response = await axios.post('http://localhost:5000/api/characters', characterData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Character created:', response.data);
    } catch (error) {
      console.error('There was a problem with the character submission:', error);
    }
  };

  return (
    <div>
      <CharacterSheet character={character} />
      <button onClick={handleSubmit}>Submit Character</button>
    </div>
  );
}

export default ReviewAndSubmit;
