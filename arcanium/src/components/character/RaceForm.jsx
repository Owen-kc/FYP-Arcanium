import React from 'react';
import APISearch from '../APISearch'; 

function RaceForm({ character, updateCharacter, nextStep }) {
  // Callback function for when a race is selected
  const handleRaceSelect = (selectedRace) => {
    updateCharacter({ race: selectedRace.name }); 
    nextStep(); // Optionally move to the next step upon selection
  };

  return (
    <div>
      <h2>Select a Race</h2>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/races/" 
        placeholder="Search for races..."
        displayProps={['name', 'description']} 
        enableSelection={true}
        onItemSelect={handleRaceSelect}
      />
    </div>
  );
}

export default RaceForm;
