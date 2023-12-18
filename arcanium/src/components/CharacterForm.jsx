import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

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
      display="flex" // Flexbox container for centering
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Full viewport height
      p={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiFormControl-root': { m: 2 }, // Margin for all form controls
      }}
    >
      <Grid container spacing={2} justifyContent="center" style={{ maxWidth: 600 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={character.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Level"
            type="number"
            name="level"
            value={character.level}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1, max: 20 } }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create Character
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CharacterForm;
