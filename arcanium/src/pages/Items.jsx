import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box } from '@mui/material';

function Items() {
    const [rarityFilter, setRarityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    // For demonstration purposes, added some generic filter options.
    // You might want to adjust these options based on your API's data.
    const rarityOptions = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"];
    const itemTypeOptions = ["Armor", "Weapon", "Potion", "Ring", "Rod", "Scroll", "Wand", "Wondrous Item"];

    return (
        <Box sx={{ bgcolor: 'background.default'}}>
            <FilterDropdown 
                options={rarityOptions} 
                value={rarityFilter} 
                onChange={(e) => setRarityFilter(e.target.value)} 
                label="Rarity" 
                id="rarity-filter" 
            />

            <FilterDropdown 
                options={itemTypeOptions} 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)} 
                label="Type" 
                id="item-type-filter" 
            />

            <APISearch 
                apiEndpoint="https://api.open5e.com/magicitems/" // replace with the correct API endpoint for items
                placeholder="Search for an item" 
                displayProps={['type', 'rarity']} // replace with relevant item properties you want to display
                filters={{ rarity: rarityFilter, type: typeFilter }}
            />
        </Box>
    );
}

export default Items;
