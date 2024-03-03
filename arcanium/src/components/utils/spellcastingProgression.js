export const spellcastingProgression = {
    // Shared spell slot progression for Cleric, Druid, and other classes
    // Fixed spells known progression up to level 10
    'standardSpellSlots': {
      1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
      4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
      5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
      7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
      8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
      9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
      10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    },
    'Bard': {
      cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
      spellsKnown: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14],
      spellSlots: 'standardSpellSlots', 
    },
    'Cleric': {
      cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5],
      spellSlots: 'standardSpellSlots', // Clerics prepare spells
    },
    'Druid': {
      cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
      spellSlots: 'standardSpellSlots', // Druids prepare spells
    },
    'Wizard': {
      cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5], 
      spellSlots: 'standardSpellSlots', // Wizards have more complicated spellcasting
    },
  
    'Sorcerer': {
      cantripsKnown: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6], // Sorcerers have more cantrips than 
      spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
      spellSlots: 'standardSpellSlots',
    },
    
    // Unique spell slot progression for half-casters
    'Paladin': {
      spellSlots: { 
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Paladins do not cast at level 1
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      },
    },

    'Ranger': {
      spellSlots: { 
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Rangers do not cast at level 1
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
      },
    },

    'Warlock': {
      cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4],
      spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10], 
      spellSlots: {
        1: [1, 0, 0, 0, 0, 0, 0, 0, 0], 
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        3: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        4: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        5: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        6: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        7: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        8: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        9: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
        10: [2, 0, 0, 0, 0, 0, 0, 0, 0], 
      },
      // Note: Warlok spell slots are all of the same level, unlike other classes.
      spellSlotLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 
    },
  };