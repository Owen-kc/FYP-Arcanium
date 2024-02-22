import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import APISearch from '../APISearch'; 

function ClassForm({ character, updateCharacter, nextStep }) {
  // Callback function for when a race is selected
  const handleClassSelect = (selectedClass) => {
    updateCharacter({ class: selectedClass.name }); 
    nextStep(); // Note: remove nextStep if wanting to add second step to class. E.g, some classes have subclasses at level 1, can make that process happen on this page.
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" color="textPrimary">
        Select a Class
      </Typography>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/classes/"
        placeholder="Search for classes"
        displayProps={['name', '']} 
        enableSelection={true}
        onItemSelect={handleClassSelect}
      />
    </Box>
  );
}

export default ClassForm;
