import React from 'react';
import APISearch from '../APISearch';

function RaceForm({ character, updateCharacter, nextStep }) {
  // function for when a race is selected
  const handleRaceSelect = (selectedRace) => {
    const asiData = selectedRace.asi.reduce((acc, asi) => {
      asi.attributes.forEach(attribute => {
        // Normalize attribute names to lower case to match struc
        const normalizedAttribute = attribute.toLowerCase();
        acc[normalizedAttribute] = (acc[normalizedAttribute] || 0) + asi.value;
      });
      return acc;
    }, {});

    // Update the character state with the race name and the structured ASI data
    updateCharacter({ 
      race: selectedRace.name,
      asi: asiData 
    });

    nextStep(); // Move to the next step upon selection
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
