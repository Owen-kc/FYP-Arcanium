import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function CharacterDetailsForm({ character, updateCharacter, nextStep, prevStep }) {
  const [details, setDetails] = useState(character.details);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCharacter({ details });
    nextStep(); 
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        margin="normal"
        fullWidth
        id="backstory"
        label="Backstory"
        name="backstory"
        autoComplete="backstory"
        value={details.backstory}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="height"
        label="Height"
        name="height"
        autoComplete="height"
        value={details.height}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="weight"
        label="Weight"
        name="weight"
        autoComplete="weight"
        value={details.weight}
        onChange={handleChange}
      />
      {/* Add more fields as needed */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={prevStep} sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default CharacterDetailsForm;
