import React, { useState, useEffect } from 'react';
import { TextField, Paper, List, ListItem, Typography, Box } from '@mui/material';

function Monsters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [monsterData, setMonsterData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchMonsters = async () => {
    const response = await fetch(`https://api.open5e.com/monsters/?search=${searchTerm}`);
    const data = await response.json();
    const filteredResults = data.results.filter(monster => !monster.slug.includes('a5e'));
    setMonsterData(filteredResults);
    setSuggestions(filteredResults);
  };

  useEffect(() => {
    if (searchTerm) {
      const debouncedFetch = debounce(fetchMonsters, 500);
      debouncedFetch();
    } else {
      setMonsterData([]);
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  return (
    <Box component="div" p={4} bgcolor="background.paper">
      <TextField
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for a monster"
        variant="outlined"
        margin="normal"
      />
      <Paper elevation={3}>
        <List>
          {suggestions.slice(0, 5).map(monster => (
            <ListItem 
              button
              key={monster.slug}
              onClick={() => handleSuggestionClick(monster.name)}
            >
              {monster.name}
            </ListItem>
          ))}
        </List>
      </Paper>
      {monsterData.map(monster => (
        <Box key={monster.slug} mt={2} bgcolor="background.default" p={2}>
          <Typography variant="h5" gutterBottom>
            {monster.name}
          </Typography>
          <Typography>{monster.size}</Typography>
          <Typography>{monster.type}</Typography>
          <Typography>{monster.alignment}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Monsters;
