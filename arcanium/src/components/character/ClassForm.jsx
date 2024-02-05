import React from 'react';
import APISearch from '../APISearch'; 

function ClassForm({ character, updateCharacter, nextStep }) {
  // Callback function for when a race is selected
  const handleRaceSelect = (selectedRace) => {
    updateCharacter({ race: selectedRace.name }); 
    nextStep(); // Note: remove nextStep if wanting to add second step to class. E.g, some classes have subclasses at level 1, can make that process happen on this page.
  };

  return (
    <div>
      <h2>Select a Class</h2>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/classes/"
        placeholder="Search for classes"
        displayProps={['name', 'description']} 
        enableSelection={true}
        onItemSelect={handleRaceSelect}
      />
    </div>
  );
}

export default ClassForm;
