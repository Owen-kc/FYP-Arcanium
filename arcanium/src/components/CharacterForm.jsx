import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function CharacterForm() {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    level: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      });

      if (response.ok) {
        const newCharacter = await response.json();
        console.log('Character created:', newCharacter);
        // Handle success 
      } else {
        // Handle errors
        console.error('Failed to create character');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Name"
        name="name"
        value={character.name}
        onChange={handleChange}
        required
        sx={{ input: { color: 'black' } }}  
      />
      <TextField
        label="Class"
        name="class"
        value={character.class}
        onChange={handleChange}
        required
        sx={{ input: { color: 'black' } }}
      />
      <TextField
        label="Level"
        type="number"
        name="level"
        value={character.level}
        onChange={handleChange}
        InputProps={{ inputProps: { min: 1 } }}
        required
        sx={{ input: { color: 'black' } }}
      />
      {/* Add other inputs for character attributes */}
      <Button variant="contained" color="primary" type="submit">
        Create Character
      </Button>
    </Box>
  );
}

export default CharacterForm;
