// Updated RaceForm to extract skill proficiencies from race traits
import React from 'react';
import APISearch from '../APISearch';

function RaceForm({ character, updateCharacter, nextStep }) {
  // Function for when a race is selected
  const handleRaceSelect = (selectedRace) => {
    const asiData = selectedRace.asi.reduce((acc, asi) => {
      asi.attributes.forEach(attribute => {
        const normalizedAttribute = attribute.toLowerCase();
        acc[normalizedAttribute] = (acc[normalizedAttribute] || 0) + asi.value;
      });
      return acc;
    }, {});

    // Extract skill proficiencies from the traits description
    const proficiencyRegex = /proficiency in the (\w+) skill/gi;
    let match;
    const proficiencies = [];
    while ((match = proficiencyRegex.exec(selectedRace.traits))) {
      proficiencies.push(match[1]); // Assuming skill name is captured in the first group
    }

    // Update the character state with the race, ASI data, and racial proficiencies
    updateCharacter({ 
      race: selectedRace.name,
      asi: asiData,
      raceProficiencies: proficiencies, // Add this line to save racial proficiencies
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
