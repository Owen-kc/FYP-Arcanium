import React from 'react';
import APISearch from '../components/APISearch'; 

function Monsters() {
    return (
        <APISearch 
            apiEndpoint="https://api.open5e.com/monsters/" //adjust endpoint, placeholder, displayprops depending on page
            placeholder="Search for a monster" 
            displayProps={['size', 'type', 'alignment']} 
        />
    );
}

export default Monsters;
