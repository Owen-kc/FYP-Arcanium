import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Slider, Snackbar, Avatar, ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import { HexColorPicker } from "react-colorful";

const defaultAvatarUrl = ''; 
const alignments = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
];

function CharacterDetailsForm({ character, updateCharacter, nextStep, prevStep }) {
  const theme = useTheme();
  const [details, setDetails] = useState({
    ...character.details,
    image: character.details.image || defaultAvatarUrl,
    hairColor: character.details.hairColor || '', 
    eyeColor: character.details.eyeColor || '', 
    alignment: character.details.alignment || '', 
  });
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [hairColor, setHairColor] = useState(character.details.hairColor || '#000000');
  const [eyeColor, setEyeColor] = useState(character.details.eyeColor || '#000000');
  const [selectedAlignment, setSelectedAlignment] = useState(character.details.alignment || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const formatHeight = (value) => {
    const feet = Math.floor(value / 12);
    const inches = value % 12;
    return `${feet}'${inches}"`; // Displays as feet and inches
  };

  

  const handleSliderChange = (name, newValue) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: newValue,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setSelectedAlignment(newAlignment);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      
      if (file.size > 2097152) {
        setSnackbarMessage('Image size should not exceed 2MB.');
        setOpenSnackbar(true);
        return;
      }

      // Check the file type
      if (!file.type.match('image.*')) {
        setSnackbarMessage('Please select a valid image file.');
        setOpenSnackbar(true);
        return;
      }

      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setDetails((prevDetails) => ({
        ...prevDetails,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    updateCharacter({
      ...character,
      details: {
        ...character.details,
        hairColor: hairColor, 
        eyeColor: eyeColor,  
        alignment: selectedAlignment,
        name: details.name,
      backstory: details.backstory,
      height: details.height,
      weight: details.weight,
      image: details.image
      }
    });
    
    nextStep();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
        Character Details
      </Typography>

      <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={details.image}
          alt="Character"
          sx={{ width: 150, height: 150, mb: 2 }} // Set size of the avatar
        />
        <input
          accept="image/*"
          id="character-image-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="character-image-upload">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
      </Box>

      <TextField
        margin="normal"
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={details.name || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="backstory"
        label="Backstory"
        name="backstory"
        autoComplete="backstory"
        multiline
        rows={4}
        value={details.backstory || ''}
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Height ({formatHeight(details.height || 60)})</Typography>
          <Slider
            value={typeof details.height === 'number' ? details.height : 60}
            onChange={(e, newValue) => handleSliderChange('height', newValue)}
            aria-labelledby="height-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={formatHeight}
            min={48} // 4 feet
            max={84} // 7 feet
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Weight ({details.weight || 100} lbs)</Typography>
          <Slider
            value={typeof details.weight === 'number' ? details.weight : 100}
            onChange={(e, newValue) => handleSliderChange('weight', newValue)}
            aria-labelledby="weight-slider"
            valueLabelDisplay="auto"
            min={50} // 50 lbs
            max={300} // 300 lbs
          />
        </Grid>

        {/* Color pickers */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Hair Color
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <HexColorPicker color={hairColor} onChange={setHairColor} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF'}}>
            Eye Color
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <HexColorPicker color={eyeColor} onChange={setEyeColor} />
          </Box>
        </Grid>
        {/* Alignment selection */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Choose Your Alignment
          </Typography>
          <ToggleButtonGroup
            value={selectedAlignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="alignment"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          color: '#FFFFFF',
          
          '& .MuiToggleButtonGroup-grouped': {
            margin: theme => theme.spacing(0.5),
            border: 0,
            '&.Mui-selected, &.Mui-selected:hover': {
              color: theme => theme.palette.common.white,
              backgroundColor: theme => theme.palette.primary.main,
            },
          },
        }}
      >
        {alignments.map((alignment) => (
          <ToggleButton key={alignment} value={alignment} aria-label={alignment}>
            {alignment}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
        </Grid>
      </Grid>
      <input
        accept="image/*"
        id="character-image-upload"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={prevStep} sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
        {/* Snackbar for error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Box>
    </Box>
  );
}

export default CharacterDetailsForm;
