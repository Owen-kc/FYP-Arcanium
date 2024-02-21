import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

const ProficiencyForm = ({ character, updateCharacter, nextStep, prevStep }) => {
  const [classDetails, setClassDetails] = useState({});
  const [equipmentChoices, setEquipmentChoices] = useState([]);
  const theme = useTheme();


  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`https://api.open5e.com/classes/${character.class.toLowerCase()}/`);
        const data = await response.json();
        setClassDetails(data);
        parseEquipmentChoices(data.equipment);
        
      } catch (error) {
        console.error('Failed to fetch class details:', error);
      }
    };

    if (character.class) {
      fetchClassDetails();
    }
  }, [character.class]);

  const parseEquipmentChoices = (equipmentString) => {
    // Split the string into lines
    const equipmentLines = equipmentString.split('\n').filter(line => line.startsWith('*'));
    let choices = [];
  
    equipmentLines.forEach((line) => {
      // Check if the line contains choice groups like (*a*), (*b*)
      if (/\(\*[a-c]\*\)/.test(line)) {
        // Extract the choices from the line
        const options = line.match(/\(\*\w\*\)\s([^*]+)(?=\s\(|$)/g)
          .map(option => option.replace(/\(\*\w\*\)\s/, '').trim());
        choices.push(options.join(' or '));
      } else {
        const item = line.substring(2).trim(); // Remove the leading '* '
        choices.push(item);
      }
    });
  
    // Update the state with the parsed choices
    setEquipmentChoices(choices);
  };

  const handleEquipmentSelection = (index, value) => {
    setEquipmentChoices(prevChoices => prevChoices.map((choice, i) => 
      i === index ? value : choice
    ));
  };

  const handleSubmit = () => {
    const updatedEquipmentChoices = [...equipmentChoices]; 
    updateCharacter(prev => ({
      ...prev,
      equipment: updatedEquipmentChoices
    }));
    
    console.log(updatedEquipmentChoices);
    nextStep();
  };

  const renderEquipmentChoices = () => {
    return equipmentChoices.map((choice, index) => (
      <Grid item xs={12} md={6} key={index}>
        <Paper elevation={3} sx={{ padding: theme.spacing(2), backgroundColor: theme.palette.background.paper }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ color: theme.palette.text.primary }}>{`Equipment Choice ${index + 1}`}</FormLabel>
            <RadioGroup
              aria-label={`equipment-choice-${index}`}
              name={`equipment-choice-${index}`}
              onChange={(e) => handleEquipmentSelection(index, e.target.value)}
            >
              {choice.split(/ or /).map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ color: theme.palette.text.primary }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 800, margin: 'auto', padding: theme.spacing(3), color: theme.palette.text.primary }}>
      <Typography variant="h4" gutterBottom align="center">
        Select Your Equipment
      </Typography>
      <Grid container spacing={theme.spacing(3)} justifyContent="center">
        {renderEquipmentChoices()}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: theme.spacing(4) }}>
        {prevStep && (
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ borderColor: theme.palette.primary.main, color: theme.palette.text.primary }}>
            Back
          </Button>
        )}
        <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleSubmit} sx={{ backgroundColor: theme.palette.primary.main }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProficiencyForm;
