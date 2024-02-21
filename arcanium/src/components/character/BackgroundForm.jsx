import React from 'react';
import APISearch from '../APISearch';

function BackgroundForm({ character, updateCharacter, nextStep }) {
  // Function for when a background is selected
  const handleBackgroundSelect = (selectedBackground) => {
    // Extract skill proficiencies and split them into an array
    const skillsArray = selectedBackground.skill_proficiencies
      .replace(/either/gi, '') // Remove all occurrences of 'either' 
      .split(/,|\s+and\s+/i) // Split by comma or 'and' 
      .map(skill => skill.trim()) 
      .flatMap(skill => skill.includes('or') ? skill.split(/\s+or\s+/i) : skill) 
      .map(skill => skill.trim()); 
      console.log("Selected Background:", selectedBackground);
  console.log("Skills Array:", skillsArray);

    // Update character state with selected background and skill proficiencies
    updateCharacter(prevCharacter => {
      const updatedCharacter = {
        ...prevCharacter,
        background: selectedBackground.name,
        backgroundSkillProficiencies: skillsArray,
       
        availableSkills: skillsArray 
      };

      // Log the new character state after it's updated
      console.log('Updated character after background selection:', updatedCharacter);
      return updatedCharacter;
    });


    nextStep();
  };

  return (
    <div>
      <h2>Select a Background</h2>
      <APISearch
        apiEndpoint="https://api.open5e.com/v1/backgrounds/"
        placeholder="Search for backgrounds..."
        displayProps={['name', 'description']}
        enableSelection={true}
        onItemSelect={handleBackgroundSelect}
      />
    </div>
  );
}

export default BackgroundForm;
