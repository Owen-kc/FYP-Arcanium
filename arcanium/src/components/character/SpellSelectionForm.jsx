import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Chip, Snackbar, Alert, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Tab, Tabs, Link, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import APISearch from '../APISearch'; 
import { spellcastingProgression } from '../utils/spellcastingProgression';
import WizardHelper from '../../styling/WizardHelper';

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
  const [wizardVisible, setWizardVisible] = useState(false);
  const [snackbarTop, setSnackbarTop] = useState(0);


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

  useEffect(() => {
    // Automatically trigger WizardHelper when the component mounts
    setWizardVisible(true);

    // Optional: hide WizardHelper after a delay or based on other actions
    const timer = setTimeout(() => {
      setWizardVisible(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

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
        triggerAlert("This spell has already been selected.", 'warning');
        return;
    }

    if (isCantrip && selectedCantrips.length >= cantripsLimit) {
        triggerAlert("Cantrips limit reached.", 'error');
        return;
    }

    if (!isCantrip && selectedSpells.length >= spellsLimit) {
        triggerAlert("Spells limit reached.", 'error');
        return;
    }

    const newSpell = { ...spell, isCantrip }; // Include the isCantrip flag within the spell object
    if (isCantrip && selectedCantrips.length < cantripsLimit) {
        setSelectedCantrips(prev => [...prev, newSpell]);
    } else if (!isCantrip && selectedSpells.length < spellsLimit) {
        setSelectedSpells(prev => [...prev, newSpell]);
    } else {
        triggerAlert(`${isCantrip ? 'Cantrips' : 'Spells'} limit reached`, 'error');
    }
    triggerAlert(`${spell.name} selected!`, 'success');
};

const triggerAlert = (message, severity) => {
  setAlertInfo({ open: true, message: message, severity: severity });

  // Dynamically update the vertical position to be the middle of the user's current viewport
  const viewportOffset = window.innerHeight / 2; 
  const currentScrollPosition = window.scrollY + viewportOffset; 

  setSnackbarTop(currentScrollPosition - 100); 
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

  const [selectedTab, setSelectedTab] = useState(0);

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};

const handleJumpToEnd = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

const handleJumpToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <Box sx={{
      margin: 'auto',
      maxWidth: '800px',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      '@media (max-width:600px)': { 
        marginRight: 'auto', 
        marginLeft: '50px'
      }
    }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Select Your Spells and Cantrips</Typography>
      
      {wizardVisible && <WizardHelper />}  

      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label={`Cantrips ( ${cantripsLimit})`} />
        <Tab label={`Level 1 Spells ( ${spellsLimit})`} />
      </Tabs>

      <Link
        component="button"
        variant="body2"
        onClick={handleJumpToEnd}
        sx={{ mt: 1, display: 'block', textDecoration: 'underline', cursor: 'pointer' }}
      >
        Jump to end <IconButton size="small"><KeyboardArrowDownIcon /></IconButton>
      </Link>
      

      {selectedTab === 0 && (
        <APISearch
          apiEndpoint={`https://api.open5e.com/spells/?spell_lists=${character.class.toLowerCase()}&level_int=0`}
          placeholder="Search for cantrips"
          displayProps={[ 'desc', 'level']}
          enableSelection={true}
          onItemSelect={(spell) => handleSelectSpell(spell, true)}
        />
      )}
      {selectedTab === 1 && (
        <APISearch
          apiEndpoint={`https://api.open5e.com/spells/?spell_lists=${character.class.toLowerCase()}&level_int=1`}
          placeholder="Search for level 1 spells"
          displayProps={['desc', 'level']}
          enableSelection={true}
          onItemSelect={(spell) => handleSelectSpell(spell, false)}
        />
      )}

      {/* Jump to top */}
      <Link
        component="button"
        variant="body2"
        onClick={handleJumpToTop}
        sx={{ mt: 2, display: 'block', textDecoration: 'underline', cursor: 'pointer' }}
      >
        Jump to top <IconButton size="small"><KeyboardArrowUpIcon /></IconButton>
      </Link>
  
      {/* Section to display selected spells and cantrips */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Selected Cantrips:</Typography>
        {renderSelectedSpells(selectedCantrips)}
  
        <Typography variant="h6" sx={{ mt: 2 }}>Selected Spells:</Typography>
        {renderSelectedSpells(selectedSpells)}
      </Box>
  
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit} sx={{ minWidth: '200px' }}>Complete Selection</Button>
      </Box>
  
      <Snackbar
  open={alertInfo.open}
  autoHideDuration={6000}
  onClose={() => setAlertInfo({ ...alertInfo, open: false })}
  sx={{
    position: 'fixed', // Fixed position relative to the viewport
    top: `${snackbarTop}px`, 
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    width: 'auto',
    maxWidth: '90%' 
  }}
>
  <Alert 
    onClose={() => setAlertInfo({ ...alertInfo, open: false })} 
    severity={alertInfo.severity} 
    sx={{ width: '100%' }}
  >
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
