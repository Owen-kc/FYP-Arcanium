import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function CharacterForm() {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    race: '',
    level: 1,
  });
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    // Fetch classes and races from the Open5E API
    // This is a simplified example; you'll need error handling as well
    const fetchClassesAndRaces = async () => {
      const classResponse = await fetch('https://api.open5e.com/classes/');
      const raceResponse = await fetch('https://api.open5e.com/races/');
      const classesData = await classResponse.json();
      const racesData = await raceResponse.json();
      setClasses(classesData.results);
      setRaces(racesData.results);
    };

    fetchClassesAndRaces();
  }, []);

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
        bgcolor: 'background.paper', // use theme's paper color for background
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiInput-underline:before': { borderBottomColor: 'divider' }, // if you want to style the underline of the input field
        // You can add more styles here to match the APISearch styling
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
        sx={{ 
          bgcolor: 'background.default', // input field background color
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'divider', // border color
            },
            '&:hover fieldset': {
              borderColor: 'text.primary', // border hover color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // border color when focused
            },
          },
        }}  
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="class-select-label">Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          name="class"
          value={character.class}
          label="Class"
          onChange={handleChange}
          required
        >
          {classes.map((dndClass) => (
            <MenuItem key={dndClass.index} value={dndClass.name}>
              {dndClass.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="race-select-label">Race</InputLabel>
        <Select
          labelId="race-select-label"
          id="race-select"
          name="race"
          value={character.race}
          label="Race"
          onChange={handleChange}
          required
        >
          {races.map((dndRace) => (
            <MenuItem key={dndRace.index} value={dndRace.name}>
              {dndRace.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Level"
        type="number"
        name="level"
        value={character.level}
        onChange={handleChange}
        InputProps={{ inputProps: { min: 1, max: 20 } }}
        required
        sx={{ input: { color: 'black' } }}
      />
      <Button variant="contained" color="primary" type="submit">
        Create Character
      </Button>
    </Box>
  );
}

export default CharacterForm;
