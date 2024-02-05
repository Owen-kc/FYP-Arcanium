import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid, List, ListItem, Typography, Card, CardContent } from '@mui/material';

function CharacterForm({ userId }) {
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    race: '',
    level: 1,
    userId: userId 
  });
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [userCharacters, setUserCharacters] = useState([]);

  useEffect(() => {
    // Fetch classes and races from the Open5E API
    async function fetchClassesAndRaces() {
      const classResponse = await fetch('https://api.open5e.com/classes/');
      const raceResponse = await fetch('https://api.open5e.com/races/');
      const classesData = await classResponse.json();
      const racesData = await raceResponse.json();
      setClasses(classesData.results);
      setRaces(racesData.results);
    }

    fetchClassesAndRaces();

    // Fetch characters created by the user
    async function fetchUserCharacters() {
      try {
        const response = await fetch(`http://localhost:5000/api/characters/user/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const characters = await response.json();
        setUserCharacters(characters);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (userId) {
      fetchUserCharacters();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prevCharacter => ({
      ...prevCharacter,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characterDataWithUserId = { ...character, userId };

    try {
      const response = await fetch('http://localhost:5000/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterDataWithUserId),
      });

      if (response.ok) {
        const newCharacter = await response.json();
        console.log('Character created:', newCharacter);
        setUserCharacters(prevCharacters => [...prevCharacters, newCharacter]); // Update the local state with the new character
      } else {
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

        {/* Character display section */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            My Characters
          </Typography>
          <List>
            {userCharacters.map((char) => (
              <ListItem key={char._id} disableGutters>
                <Card variant="outlined" sx={{ width: '100%', mb: 2, backgroundColor: '#e0e0e0' }}>
                  <CardContent>
                    <Typography variant="h5" component="h3">
                      {char.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Class: {char.class}
                    </Typography>
                    <Typography color="textSecondary">
                      Race: {char.race}
                    </Typography>
                    <Typography color="textSecondary">
                      Level: {char.level}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CharacterForm;
