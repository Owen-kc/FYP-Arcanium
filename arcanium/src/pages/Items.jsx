import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box, Grid, Typography } from '@mui/material';

function Items() {
    const [rarityFilter, setRarityFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const rarityOptions = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"];
    const itemTypeOptions = ["Armor", "Weapon", "Potion", "Ring", "Rod", "Scroll", "Wand", "Wondrous Item"];

    return (
        <Box sx={{ bgcolor: 'background.default', padding: 2 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <FilterDropdown 
                        options={rarityOptions} 
                        value={rarityFilter} 
                        onChange={(e) => setRarityFilter(e.target.value)} 
                        label="Rarity" 
                        id="rarity-filter" 
                    />
                </Grid>
                <Grid item>
                    <FilterDropdown 
                        options={itemTypeOptions} 
                        value={typeFilter} 
                        onChange={(e) => setTypeFilter(e.target.value)} 
                        label="Type" 
                        id="item-type-filter" 
                    />
                </Grid>
            </Grid>

            <APISearch 
                apiEndpoint="https://api.open5e.com/magicitems/" // Replace with the correct API endpoint for items
                placeholder="Search for an item" 
                displayProps={['type', 'rarity']} // Replace with relevant item properties you want to display
                filters={{ rarity: rarityFilter, type: typeFilter }}
            />
        </Box>
    );
}

export default Items;
