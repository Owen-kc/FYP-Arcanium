
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

  