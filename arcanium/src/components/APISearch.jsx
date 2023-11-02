import React, { useState, useEffect } from 'react';
import {
  TextField, Box, Autocomplete, Typography, Grid, FormControl, InputLabel, Select, Card, CardContent,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

const DEFAULT_FILTERS = {};
function APISearch({ apiEndpoint, placeholder, displayProps, filters = DEFAULT_FILTERS }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    

    const fetchData = async (pageNum, searchValue) => {
        let query = `${apiEndpoint}?search=${searchValue}&page=${pageNum}`;
        
        for (let key in filters) {
            if (filters[key]) {
                query += `&${key}=${filters[key]}`;
            }
        }

        const response = await fetch(query);
        const json = await response.json();
        
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

    useEffect(() => {
        setData([]);
        setHasMore(true);
        setCurrentPage(1);
        fetchData(1, searchTerm);
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
                next={() => {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    fetchData(nextPage, searchTerm);
                }}
                hasMore={hasMore}
                loader={
                    <Box display="flex" justifyContent="center" mt={2}>
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
