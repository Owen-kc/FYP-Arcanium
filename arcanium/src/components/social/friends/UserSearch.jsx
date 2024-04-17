import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, Box, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import UserProfile from '../UserProfile';
import CustomAlert from '../CustomAlert'; 

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${searchTerm}`);
      const users = response.data.users || [];
      setResults(users);
      setAlert({ open: false });
    } catch (error) {
      console.error('Error searching users:', error);
      setResults([]);
      setAlert({ open: true, message: 'Failed to search users.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
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
      <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
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
