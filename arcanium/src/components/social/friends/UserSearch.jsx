import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, Box, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import UserProfile from '../UserProfile';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${searchTerm}`);
      const users = response.data.users || [];
      setResults(users);
    } catch (error) {
      console.error('Error searching users:', error);
      setResults([]);
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Search Users"
          value={searchTerm}
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 1 }}>
          Search
        </Button>
      </Paper>
      <Grid container spacing={2} justifyContent="center">
        {results.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UserProfile userData={user} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserSearch;
