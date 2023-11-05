import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box } from '@mui/material';

function Armor() {
    const [armorTypeFilter, setArmorTypeFilter] = useState("");
    const [armorClassFilter, setArmorClassFilter] = useState("");

    const armorTypeOptions = ["Light", "Medium", "Heavy", "Shield", "No Armor"];  // Added "No Armor" as an option based on the given JSON
    const armorClassOptions = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <Box>
            <APISearch 
                apiEndpoint="https://api.open5e.com/v1/armor/"
                placeholder="Search for armor" 
                displayProps={['category', 'base_ac']}  // Updated the displayProps to match JSON keys
                filters={{ category: armorTypeFilter, base_ac: armorClassFilter }}  // Updated the filters to match JSON keys
            />
        </Box>
    );
}

export default Armor;
