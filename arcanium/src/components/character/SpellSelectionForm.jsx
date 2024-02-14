import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import APISearch from '../APISearch'; 
import classData from '../utils/classData.json'; 

const SpellSelectionForm = ({ character, updateCharacter, nextStep, prevStep }) => {
    const [spellsLimit, setSpellsLimit] = useState(0);
    const [cantripsLimit, setCantripsLimit] = useState(0);
    const [selectedSpells, setSelectedSpells] = useState([]);
    const [selectedCantrips, setSelectedCantrips] = useState([]);

    const getSpellInfoForClassAndLevel = (className, level) => {
      const classInfo = classData[className];
      if (!classInfo || !classInfo["The Class"] || !classInfo["The Class"]["table"]) {
          return { spellsKnown: 0, cantripsKnown: 0 };
      }
  
      const spellTable = classInfo["The Class"]["table"];
      const levelIndex = spellTable["Level"].indexOf(`${level}th`);
      if (levelIndex === -1) {
          return { spellsKnown: 0, cantripsKnown: 0 };
      }
  
      const cantripsKnown = parseInt(spellTable["Cantrips Known"][levelIndex], 10);
      
      const spellsKnown = level > 1 ? parseInt(spellTable[`${level}th`][levelIndex], 10) || 0 : parseInt(spellTable["1st"][levelIndex], 10);
  
      return { spellsKnown, cantripsKnown };
  };
  

  useEffect(() => {
    const { spellsKnown, cantripsKnown } = getSpellInfoForClassAndLevel(character.class, character.level);
    setSpellsLimit(spellsKnown);
    setCantripsLimit(cantripsKnown);
}, [character.class, character.level]);

    // Define the API endpoint with filters for class and level
    const classFilter = character.class.toLowerCase();
    const levelFilter = character.level; 
    const apiEndpointWithFilters = `https://api.open5e.com/spells/?spell_lists=${classFilter}&level_int=${levelFilter}`;

    const handleSelectSpell = (spell, isCantrip) => {
        if (isCantrip) {
            if (selectedCantrips.length < cantripsLimit) {
                setSelectedCantrips([...selectedCantrips, spell]);
            } else {
                console.log("Cantrips limit reached");
            }
        } else {
            if (selectedSpells.length < spellsLimit) {
                setSelectedSpells([...selectedSpells, spell]);
            } else {
                console.log("Spells limit reached");
            }
        }
    };

    const handleSubmit = () => {
        updateCharacter({
            ...character,
            spells: [...selectedSpells, ...selectedCantrips]
        });
        console.log("Selected spells and cantrips updated.");
        nextStep();
    };

    return (
        <Box>
            <Typography variant="h6">Select Your Spells and Cantrips</Typography>
            <Typography variant="body1">You can select up to {spellsLimit} spells and {cantripsLimit} cantrips.</Typography>
            <APISearch
                apiEndpoint={apiEndpointWithFilters}
                placeholder="Search for spells"
                displayProps={['name', 'desc', 'level']}
                enableSelection={true}
                onItemSelect={(spell) => handleSelectSpell(spell, spell.level === "0")}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={prevStep}>Previous</Button>
                <Button variant="contained" onClick={handleSubmit}>Next</Button>
            </Box>
        </Box>
    );
};

export default SpellSelectionForm;
