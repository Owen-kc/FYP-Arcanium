import React from 'react';
import APISearch from '../components/APISearch'; 

function Spells() {
    return (
        <APISearch 
            apiEndpoint="https://api.open5e.com/spells/"
            placeholder="Search for a spell" 
            displayProps={['desc', 'level', 'school', 'casting_time', 'duration']}
        />
    );
}

export default Spells;
