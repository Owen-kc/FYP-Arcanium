import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

const CharacterSkills = ({ character }) => {
    console.log('Character data:', character);
  if (!character || !character.skillToAbilityMap || !character.abilityScores) {
    // Render nothing or some placeholder if the character data is not ready
    console.log('Character data is not ready.');
    return null; 
  }

  const proficiencyBonus = 2; 

  // Function to calculate ability modifier
  const calculateAbilityModifier = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
  };

  // Function to calculate skill modifier
  const calculateSkillModifier = (skill) => {
    const ability = character.skillToAbilityMap[skill];
    
    if (!character.abilityScores[ability]) {
      return 0; 
    }
    const abilityScore = character.abilityScores[ability];
    const abilityModifier = calculateAbilityModifier(abilityScore);
    const isProficient = character.skills && character.skills.includes(skill);
    return abilityModifier + (isProficient ? proficiencyBonus : 0);
  };

  return (
    <Box>
      <Typography variant="h6">Skills</Typography>
      <Grid container spacing={2}>
        {Object.keys(character.skillToAbilityMap).map((skill) => (
          <Grid item xs={6} sm={4} md={3} key={skill}>
            <Typography variant="body1">{skill}: {calculateSkillModifier(skill)}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CharacterSkills;
