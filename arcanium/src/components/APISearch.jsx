import React, { useState, useEffect } from 'react';
import {
  TextField, Box, Autocomplete, Typography, Button, CircularProgress
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDialog from './dialog/ItemDialog';

const DEFAULT_FILTERS = {};

// Add enableSelection and optional onItemSelect props
function APISearch({
  apiEndpoint,
  placeholder,
  displayProps,
  filters = DEFAULT_FILTERS,
  enableSelection = false, // Decides if selection functionality is enabled
  onItemSelect = () => {} // Default to a no-op function if not provided
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to fetch data from the API, with pagination and search term
  const fetchData = async (pageNum, searchValue) => {
    let baseUrl = apiEndpoint.includes('?') ? `${apiEndpoint}&` : `${apiEndpoint}?`;
    let query = `${baseUrl}search=${searchValue}&page=${pageNum}`;  // Add search term and page number to the query
    console.log(query);

    // Add filters to the query string, if any
    for (let key in filters) {
      if (filters[key]) {
        query += `&${key}=${filters[key]}`;
      }
    }

    // Fetch data from the API
    const response = await fetch(query);
    const json = await response.json();

    // Check if there are any results and filter out any items with 'a5e' in the slug
    if (!json.results || json.results.length === 0) {
      setHasMore(false);
      return [];
    }
    const filteredResults = json.results.filter(item => !item.slug.includes('a5e'));

    if (pageNum === 1) {
      setData(filteredResults);
    } else {
      const newResults = filteredResults.filter(item => !data.some(existingItem => existingItem.slug === item.slug));
      setData(prevData => [...prevData, ...newResults]);
    }
  };

  useEffect(() => {
    fetchData(1, ""); // Load initial data when the component mounts
  }, []);

  // Reset data and pagination when the search term or filters change
  useEffect(() => {
    setData([]);
    setHasMore(true);
    setCurrentPage(1);
    fetchData(1, searchTerm);
  }, [searchTerm, filters]);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  // New function to handle item selection
  const handleSelectItem = (item) => {
    if (enableSelection) {
      onItemSelect(item); // Invoke callback with the selected item
      setIsDialogOpen(false); // Close the dialog upon selection
    }
  };

  return (
    <Box component="div" p={4} sx={{ bgcolor: 'background.paper' }}>
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
            sx={{ bgcolor: 'background.default' }}
          />
        )}
      />
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchData(nextPage, searchTerm);
        }}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        }
      >
        {data.length === 0 && !hasMore && (
          <Typography align="center" mt={2}>
            No entries
          </Typography>
        )}
        {data.map(item => (
          <Box key={item.slug} mt={2} sx={{ bgcolor: 'background.default', p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
              {item.name}
            </Typography>
            {displayProps.map(prop => (
              <Typography sx={{ color: 'text.primary' }} key={prop}>{item[prop]} </Typography>
            ))}
            <Button 
              color="primary" 
              variant="contained" 
              sx={{ mt: 1 }}
              onClick={() => handleOpenDialog(item)}
            >
              View Details
            </Button>
            {/* Conditionally render the Select button if enabled */}
            {enableSelection && (
              <Button
                color="secondary"
                variant="contained"
                sx={{ ml: 2, mt: 1 }}
                onClick={() => handleSelectItem(item)}
              >
                Select
              </Button>
            )}
          </Box>
        ))}
      </InfiniteScroll>

      <ItemDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} item={selectedItem} />
    </Box>
  );
}

export default APISearch;
