import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Button, Box } from '@mui/material';
import APISearch from '../APISearch';

function BackgroundForm({ character, updateCharacter, nextStep }) {
  // Function for when a background is selected
  const handleBackgroundSelect = (selectedBackground) => {
    // Extract skill proficiencies and split them into an array
    const skillsArray = selectedBackground.skill_proficiencies
      .replace(/either/gi, '') // Remove all occurrences of 'either'
      .split(/,|\s+and\s+/i) // Split by comma or 'and'
      .map(skill => skill.trim()) // Trim whitespace from each skill
      .flatMap(skill => skill.includes('or') ? skill.split(/\s+or\s+/i) : skill) // Handle 'or'
      .map(skill => skill.trim()); // Final trim

    // Update character state with selected background and skill proficiencies
    updateCharacter({
      background: selectedBackground.name,
      backgroundSkillProficiencies: skillsArray,
      availableSkills: skillsArray 
    });

    // Log the new character state after it's updated
    console.log('Selected Background:', selectedBackground);
    console.log('Skills Array:', skillsArray);

    nextStep();
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" color="textPrimary">
        Select a Background
      </Typography>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/backgrounds/"
        placeholder="Search for backgrounds..."
        displayProps={['name', 'description']}
        enableSelection={true}
        onItemSelect={handleBackgroundSelect}
      />
    </Box>
  );
}

export default BackgroundForm;
