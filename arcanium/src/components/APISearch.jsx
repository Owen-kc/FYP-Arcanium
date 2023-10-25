import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Autocomplete } from '@mui/material';

function APISearch({ apiEndpoint, placeholder, displayProps }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${apiEndpoint}?search=${searchTerm}`);
    const json = await response.json();
    const filteredResults = json.results.filter(item => !item.slug.includes('a5e'));
    setData(filteredResults);
    setSuggestions(filteredResults);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    } else {
      setData([]);
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <Box component="div" p={4} bgcolor="background.paper">
      <Autocomplete
        options={suggestions}
        getOptionLabel={(option) => option.name}
        onInputChange={(event, newValue) => {
          setSearchTerm(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            margin="normal"
            label={placeholder}
            fullWidth
            clearOnEscape
          />
        )}
      />
      {data.map(item => (
        <Box key={item.slug} mt={2} bgcolor="background.default" p={2}>
          <Typography variant="h5" gutterBottom>
            {item.name}
          </Typography>
          {displayProps.map(prop => (
            <Typography key={prop}>{item[prop]}</Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default APISearch;
