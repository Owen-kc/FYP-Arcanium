import React from 'react';
import APISearch from '../components/APISearch'; 
import { Box } from '@mui/material';

function Feats() {
    return (
        <Box>
            <APISearch 
                apiEndpoint="https://api.open5e.com/v1/feats/"
                placeholder="Search for a feat" 
                displayProps={['prerequisite']}
                filters={{}} 
            />
        </Box>
    );
}

export default Feats;
