import React from 'react';
import APISearch from '../components/APISearch'; 
import { Box } from '@mui/material';

function Backgrounds() {
    return (
        <Box>
            <APISearch 
                apiEndpoint="https://api.open5e.com/v1/backgrounds/" // adjust the endpoint if different
                placeholder="Search for a background" 
                displayProps={['description']} // adjust with relevant background properties you want to display
            />
        </Box>
    );
}

export default Backgrounds;
