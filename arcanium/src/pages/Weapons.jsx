import React, { useState } from 'react';
import APISearch from '../components/APISearch'; 
import FilterDropdown from '../components/FilterDropdown'; 
import { Box } from '@mui/material';

function Weapons() {
    const [damageDiceFilter, setDamageDiceFilter] = useState("");
    const [damageTypeFilter, setDamageTypeFilter] = useState("");

    const damageDiceOptions = ["1d4", "1d6", "1d8", "1d10", "1d12", "2d6", "2d8"]; 
    const damageTypeOptions = ["bludgeoning", "piercing", "slashing"];

    return (
        <Box sx={{ bgcolor: 'background.default'}}>
            <FilterDropdown 
                options={damageDiceOptions} 
                value={damageDiceFilter} 
                onChange={(e) => setDamageDiceFilter(e.target.value)} 
                label="Damage Dice" 
                id="damage-dice-filter" 
            />

            <FilterDropdown 
                options={damageTypeOptions} 
                value={damageTypeFilter} 
                onChange={(e) => setDamageTypeFilter(e.target.value)} 
                label="Damage Type" 
                id="damage-type-filter" 
            />

            <APISearch 
                apiEndpoint="https://api.open5e.com/v1/weapons/"
                placeholder="Search for a weapon" 
                displayProps={['damage_type', 'damage_dice']} 
                filters={{ damage_dice: damageDiceFilter, damage_type: damageTypeFilter }}
            />
        </Box>
    );
}

export default Weapons;
