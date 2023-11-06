import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box } from '@mui/material';

function Spells() {
    const [schoolFilter, setSchoolFilter] = useState("");
    const [levelFilter, setLevelFilter] = useState("");

    const schoolOptions = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
    const levelOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <Box sx={{ bgcolor: 'background.default'}}>
            <FilterDropdown 
                options={schoolOptions} 
                value={schoolFilter} 
                onChange={(e) => setSchoolFilter(e.target.value)} 
                label="School" 
                id="school-filter" 
            />

            <FilterDropdown 
                options={levelOptions} 
                value={levelFilter} 
                onChange={(e) => setLevelFilter(e.target.value)} 
                label="Level" 
                id="level-filter" 
            />

            <APISearch 
                apiEndpoint="https://api.open5e.com/spells/"
                placeholder="Search for a spell" 
                displayProps={['desc', 'level', 'school', 'casting_time', 'duration']}
                filters={{ school: schoolFilter, spell_level: levelFilter }}
            />
        </Box>
    );
}

export default Spells;
