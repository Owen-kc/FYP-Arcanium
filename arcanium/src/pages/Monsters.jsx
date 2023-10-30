import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import { TextField, Box } from '@mui/material';

function Monsters() {
    const [crFilter, setCRFilter] = useState("");
    
    return (
        <Box>
            <TextField 
                value={crFilter}
                onChange={(e) => setCRFilter(e.target.value)}
                label="Filter by CR"
            />
            <APISearch 
                apiEndpoint="https://api.open5e.com/monsters/"
                placeholder="Search for a monster" 
                displayProps={['size', 'type', 'alignment']}
                filters={{ cr: crFilter }}
            />
        </Box>
    );
}

export default Monsters;
