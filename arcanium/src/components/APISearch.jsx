import React, { useState, useEffect } from 'react';
import { TextField, Box, Autocomplete, Typography, Select } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

function APISearch({ apiEndpoint, placeholder, displayProps, filters = {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page = 1) => {
    let query = `${apiEndpoint}?search=${searchTerm}&page=${page}`;
    for (let key in filters) {
      if (filters[key]) {
        query += `&${key}=${filters[key]}`;
      }
      console.log("Fetching page:", page);

    }

    const response = await fetch(query);
    const json = await response.json();
    if (!json.results || json.results.length === 0) {
      setHasMore(false);
      return;
    }
    const filteredResults = json.results.filter(item => !item.slug.includes('a5e'));
    setData(prevData => [...prevData, ...filteredResults]);
  };

  useEffect(() => {
    setData([]);  // reset data when searchTerm or filters change
    setHasMore(true);  // reset pagination
    fetchData();
  }, [searchTerm, filters]);

  return (
    <Box component="div" p={4} bgcolor="background.paper">
      <Autocomplete
        options={data}
        getOptionLabel={(option) => option.name}
        onInputChange={(event, newValue) => {
          setSearchTerm(newValue);
        }}
        clearOnBlur={false}
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
      <InfiniteScroll
    dataLength={data.length}
    next={() => fetchData(Math.ceil(data.length / 10) + 1)}
    hasMore={hasMore}
    loader={
      <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
      </Box>
  }
>
    {/* Check if there are no entries and if the API has been fetched at least once */}
    {data.length === 0 && !hasMore && (
      <Typography align="center" mt={2}>
        No entries
      </Typography>
    )}

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
</InfiniteScroll>
    </Box>
  );
}

export default APISearch;
