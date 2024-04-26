import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions, RadioGroup, FormControlLabel, Radio, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProficiencyForm = ({ character, updateCharacter, nextStep, prevStep }) => {
  const [classDetails, setClassDetails] = useState({});
  const [equipmentChoices, setEquipmentChoices] = useState([]);
  const theme = useTheme();

  // Fetch class details when the component mounts
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`https://api.open5e.com/classes/${character.class.toLowerCase()}/`); // Fetch class details from the Open5e API
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
    const equipmentLines = equipmentString.split('\n').filter(line => line.startsWith('*'));
    let choices = [];
    equipmentLines.forEach((line) => {
      if (/\(\*[a-c]\*\)/.test(line)) {
        // Extract choices and remove the '(*a*)' notation
        const options = line.match(/\(\*\w\*\)\s([^*]+)(?=\s\(|$)/g)
          .map(option => option.replace(/\(\*\w\*\)\s/, '').trim())
          .map(option => {
            let formattedOption = option.replace(/^or\s+/i, '');
            return formattedOption.charAt(0).toUpperCase() + formattedOption.slice(1);
          });
        // Join the options with ' or ' and add to the choices
        choices.push(options.join(' or '));
      } else {
        // For items without options, just capitalize the first letter
        let item = line.substring(2);
        item = item.replace(/^or\s+/i, ''); 
        item = item.charAt(0).toUpperCase() + item.slice(1);
        choices.push(item);
      }
    });
    setEquipmentChoices(choices);
  };
  

  const handleEquipmentSelection = (index, value) => {
    setEquipmentChoices(prevChoices => prevChoices.map((choice, i) => 
      i === index ? value : choice
    ));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    updateCharacter({ ...character, equipment: equipmentChoices });
    nextStep();
  };

  const renderEquipmentChoices = () => {
    return equipmentChoices.map((choice, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Card elevation={3} sx={{ padding: 2, margin: 2, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="subtitle1">{`Equipment Choice ${index + 1}`}</Typography>
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
                />
              ))}
            </RadioGroup>
          </CardContent>
          <CardActions>
            {/* Future action buttons can be added here */}
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      maxWidth: 800, 
      margin: 'auto', 
      padding: 3, 
      '@media (max-width:600px)': {
        paddingLeft: '50px'  // Shifts content slightly to the right on mobile
      }
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'white' }}>
        Select Your Equipment
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2, color: 'white' }}>
        As a <span style={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>{character.class}</span>, you get the following equipment choices:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {renderEquipmentChoices()}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          Select Equipment
        </Button>
      </Box>
    </Box>
  );
};

export default ProficiencyForm;
