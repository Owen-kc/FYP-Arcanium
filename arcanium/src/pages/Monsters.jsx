import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box, Grid, Typography } from '@mui/material';

function Monsters() {
    const [crFilter, setCRFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const crOptions = [0.125, 0.25, 0.5, ...Array.from({length: 30}, (_, i) => i + 1)];
    const typeOptions = ["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"];

    return (
        <Box sx={{ bgcolor: 'background.default', padding: 2 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <FilterDropdown 
                        options={crOptions} 
                        value={crFilter} 
                        onChange={(e) => setCRFilter(e.target.value)} 
                        label="CR" 
                        id="cr-filter" 
                    />
                </Grid>
                <Grid item>
                    <FilterDropdown 
                        options={typeOptions} 
                        value={typeFilter} 
                        onChange={(e) => setTypeFilter(e.target.value)} 
                        label="Type" 
                        id="type-filter" 
                    />
                </Grid>
            </Grid>

            <APISearch 
                apiEndpoint="https://api.open5e.com/monsters/"
                placeholder="Search for a monster" 
                displayProps={['size', 'type', 'alignment']}
                filters={{ cr: crFilter, type: typeFilter }}
            />
        </Box>
    );
}

export default Monsters;
