// Updated RaceForm to extract skill proficiencies from race traits
import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Button, Box } from '@mui/material';
import APISearch from '../APISearch';

function RaceForm({ character, updateCharacter, nextStep }) {
  // Function for when a race is selected
  const handleRaceSelect = (selectedRace) => {
    const asiData = selectedRace.asi.reduce((acc, asi) => {
      asi.attributes.forEach(attribute => {
        const normalizedAttribute = attribute.toLowerCase();
        acc[normalizedAttribute] = (acc[normalizedAttribute] || 0) + asi.value;
      });
      return acc;
    }, {});

    // Extract skill proficiencies from the traits description
    const proficiencyRegex = /proficiency in the (\w+) skill/gi;
    let match;
    const proficiencies = [];
    while ((match = proficiencyRegex.exec(selectedRace.traits))) {
      proficiencies.push(match[1]); 
    }

    // Update the character state with the race, ASI data, and racial proficiencies
    updateCharacter({ 
      race: selectedRace.name,
      asi: asiData,
      raceProficiencies: proficiencies,
      speed: selectedRace.speed 
    });

    nextStep(); 
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" color="textPrimary">
        Select a Race
      </Typography>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/races/"
        placeholder="Search for races..."
        displayProps={['name', '']}
        enableSelection={true}
        onItemSelect={handleRaceSelect}
      />
    </Box>
  );
}

export default RaceForm;
