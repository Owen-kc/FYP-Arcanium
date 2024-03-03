import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Chip, Snackbar, Alert, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import APISearch from '../APISearch'; 
import { spellcastingProgression } from '../utils/spellcastingProgression';

const SpellSelectionForm = ({ character, updateCharacter, nextStep, prevStep }) => {
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'info' });
  const [spellsLimit, setSpellsLimit] = useState(0);
  const [cantripsLimit, setCantripsLimit] = useState(0);
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedCantrips, setSelectedCantrips] = useState([]);
  // For non-spellcasting (or delayed) classes
  const [openNoSpellsDialog, setOpenNoSpellsDialog] = useState(false);
  const classesWithoutSpells = new Set(['Barbarian', 'Fighter', 'Rogue', 'Monk']);
  const classesWithDelayedSpellAccess = new Set(['Paladin', 'Ranger']);

  useEffect(() => {
    const classInfo = spellcastingProgression[character.class];
    if (classesWithoutSpells.has(character.class) || 
        (classesWithDelayedSpellAccess.has(character.class) && character.level < 2)) {
      // Open the dialog for classes without spells or with delayed spell access
      setOpenNoSpellsDialog(true);
    } else {

    // Set the limits for cantrips and spells
    if (classInfo) {
      setCantripsLimit(classInfo.cantripsKnown[character.level - 1] || 0);
      const spellSlots = classInfo.spellSlots === 'standardSpellSlots' ? 
                         spellcastingProgression.standardSpellSlots[character.level] : 
                         classInfo.spellSlots[character.level];
      setSpellsLimit(spellSlots ? spellSlots[0] : 0); 
    }
  }
  }, [character.class, character.level]);

  // Close non-spellcasting dialog, move to next step
  const handleCloseNoSpellsDialog = () => {
    setOpenNoSpellsDialog(false);
    nextStep();
  };

  const handleSelectSpell = (spell, isCantrip) => {
    const alreadySelected = isCantrip
    ? selectedCantrips.some(s => s.name === spell.name)
    : selectedSpells.some(s => s.name === spell.name);

  if (alreadySelected) {
    setAlertInfo({ open: true, message: "This spell has already been selected.", severity: 'warning' });
    return;
  }

  if (isCantrip && selectedCantrips.length >= cantripsLimit) {
    setAlertInfo({ open: true, message: "Cantrips limit reached.", severity: 'error' });
    return;
  }

  if (!isCantrip && selectedSpells.length >= spellsLimit) {
    setAlertInfo({ open: true, message: "Spells limit reached.", severity: 'error' });
    return;
  }

    const newSpell = { ...spell, isCantrip }; // Include the isCantrip flag within the spell object
    if (isCantrip && selectedCantrips.length < cantripsLimit) {
        setSelectedCantrips(prev => [...prev, newSpell]);
    } else if (!isCantrip && selectedSpells.length < spellsLimit) {
        setSelectedSpells(prev => [...prev, newSpell]);
    } else {
        alert(`${isCantrip ? 'Cantrips' : 'Spells'} limit reached`);
    }
    setAlertInfo({ open: true, message: `${spell.name} selected!`, severity: 'success' });
};

const handleSubmit = () => {
  updateCharacter({
    ...character,
    spells: [...selectedSpells, ...selectedCantrips]
  });
  setAlertInfo({
    open: true,
    message: "Selection completed! Moving to the next step.",
    severity: 'success'
  });
  // Wait for the alert to be seen before moving on
  setTimeout(() => {
    nextStep();
  }, 2000); 
};

  const handleDeleteSpell = (spellName) => {
    // remove the spell from both cantrips and spells regardless of its type
    setSelectedCantrips(currentCantrips => currentCantrips.filter(spell => spell.name !== spellName));
    setSelectedSpells(currentSpells => currentSpells.filter(spell => spell.name !== spellName));
    setAlertInfo({ open: true, message: `${spellName} has been removed.`, severity: 'info' });
  };

  const renderSelectedSpells = (selectedSpellsArray, isCantrip) => {
    return selectedSpellsArray.map(spell => (
      <Chip
      key={spell.name}
      label={spell.name}
      onDelete={() => handleDeleteSpell(spell.name)} // Call directly with spell.name
      color="primary"
      sx={{ margin: '2px' }}
    />
    ));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Select Your Spells and Cantrips</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Cantrips (Select up to {cantripsLimit})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <APISearch
                apiEndpoint={`https://api.open5e.com/spells/?spell_lists=${character.class.toLowerCase()}&level_int=0`}
                placeholder="Search for cantrips"
                displayProps={['name', 'desc', 'level']}
                enableSelection={true}
                onItemSelect={(spell) => handleSelectSpell(spell, true)}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={6}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Level 1 Spells (Select up to {spellsLimit})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <APISearch
                apiEndpoint={`https://api.open5e.com/spells/?spell_lists=${character.class.toLowerCase()}&level_int=1`}
                placeholder="Search for level 1 spells"
                displayProps={['name', 'desc', 'level']}
                enableSelection={true}
                onItemSelect={(spell) => handleSelectSpell(spell, false)}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      
      {/* Section to display selected spells and cantrips */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Selected Cantrips:</Typography>
        {renderSelectedSpells(selectedCantrips)}

        <Typography variant="h6" sx={{ mt: 2 }}>Selected Spells:</Typography>
        {renderSelectedSpells(selectedSpells)}
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Complete Selection</Button>
      </Box>
      
      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={() => setAlertInfo({ ...alertInfo, open: false })}>
      <Alert onClose={() => setAlertInfo({ ...alertInfo, open: false })} severity={alertInfo.severity} sx={{ width: '100%' }}>
        {alertInfo.message}
      </Alert>
    </Snackbar>

    {/* Dialog for classes without spells */}
    <Dialog
        open={openNoSpellsDialog}
        onClose={handleCloseNoSpellsDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Spellcasting Not Available"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`As a ${character.class}, you don't have access to spells at this level.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoSpellsDialog} color="primary">
            Move to next step
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};


export default SpellSelectionForm;
