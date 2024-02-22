//----------MATHEMATICAL CALCULATIONS--------------//

// Calculate the cost to increase or decrease an ability score
export const calculatePointCost = (currentScore, newScore) => {
    let cost = 0;
    if (newScore > currentScore) {
      for (let score = currentScore; score < newScore; score++) {
        cost += score >= 13 ? 2 : 1;
      }
    } else {
      for (let score = currentScore; score > newScore; score--) {
        cost -= score > 13 ? 2 : 1;
      }
    }
    return cost;
  };
  
  // Calculate the ability score modifier
  export const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  // Dice roll calculation (all)
  export const rollDiceForScores = () => {
    const roll4d6DropLowest = () => {
      let rolls = [];
      for (let i = 0; i < 4; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }
      rolls.sort((a, b) => b - a);
      return rolls.slice(0, 3).reduce((total, current) => total + current, 0);
    };
  
    return {
      strength: roll4d6DropLowest(),
      dexterity: roll4d6DropLowest(),
      constitution: roll4d6DropLowest(),
      intelligence: roll4d6DropLowest(),
      wisdom: roll4d6DropLowest(),
      charisma: roll4d6DropLowest(),
    };
  };

// utility function to return individual dice rolls
export const rollSingleAbilityScore = () => {
  let rolls = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  rolls.sort((a, b) => b - a); 
  return {
    sum: rolls.slice(0, 3).reduce((total, current) => total + current, 0),
    rolls: rolls // Return all rolls for visual representation
  };
};


//----------CLASS SPELL CALCULATIONS--------------//

export function extractSpellcastingDataForAllClasses(classData) {
  let spellcastingInfo = {};

  Object.entries(classData).forEach(([className, classAttributes]) => {
    // Locate the section with spellcasting info, accommodating variability in structure
    const classFeatureKeys = Object.keys(classAttributes["Class Features"]);
    const classSectionKey = classFeatureKeys.find(key => key.startsWith("The"));

    if (classSectionKey && Array.isArray(classAttributes["Class Features"][classSectionKey].content)) {
    
      const contentArray = classAttributes["Class Features"][classSectionKey].content;
      let table = null;

      for (const contentItem of contentArray) {
        if (typeof contentItem === "object" && contentItem.hasOwnProperty('table')) {
          table = contentItem.table;
          break;
        }
      }

      if (table) {
        const cantripsKnown = table["Cantrips Known"] || [];
        const spellSlots = {};

        // Define spell levels to search for within the table
        const spellLevels = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];

        spellLevels.forEach(level => {
          // Populate spellSlots only if the level exists in the table
          spellSlots[level] = table[level] || [];
        });

        // Assign extracted data to the class in the spellcastingInfo object
        spellcastingInfo[className] = { cantripsKnown, spellSlots };
      }
    }
  });

  return spellcastingInfo;
}