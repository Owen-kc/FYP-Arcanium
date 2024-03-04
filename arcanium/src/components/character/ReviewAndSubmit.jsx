import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import CharacterSheet from './CharacterSheet';

function ReviewAndSubmit({ character }) {
  const { user } = useAuth0(); // Use the useAuth0 hook to get the user object
  const userId = user?.sub; 

  const handleSubmit = async () => {
    //conversion
    const formattedSpeed = typeof character.speed === 'object' ? `Walk: ${character.speed.walk} feet` : character.speed;
    const spellNames = character.spells.map(spell => typeof spell === 'object' ? spell.name : spell);


    // Include the userId when preparing the character data for submission
    const characterData = {
      ...character,
      userId,
      name: character.details.name,
      backstory: character.details.backstory,
      height: character.details.height,
      weight: character.details.weight,
      image: character.details.image,
      hairColor: character.details.hairColor,
      eyeColor: character.details.eyeColor,
      alignment: character.details.alignment,
      background: character.background,
      speed: formattedSpeed,
      proficiencyBonus: character.proficiencyBonus,
      abilityScores: character.abilityScores,
      spells: spellNames,
      skills: character.skills,
      equipment: character.equipment,
    };

    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
      }
      const newCharacter = await response.json();
      console.log('Character created:', newCharacter);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
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
