import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Slider, Snackbar, Avatar, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import { HexColorPicker } from "react-colorful";
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import config from '../../config';

const defaultAvatarUrl = ''; 
const alignments = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
];

function CharacterDetailsForm({ character, updateCharacter, nextStep, prevStep }) {
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
  const [imageFile, setImageFile] = useState(null);
  const [imageKey, setImageKey] = useState(character.details.imageKey || '');
  const theme = useTheme();


  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Fetch image URL when imageKey changes
  useEffect(() => {
    if (imageKey) {
      fetchAndSetImageUrl(imageKey);
    }
  }, [imageKey]);

  // Function to format height in feet and inches
  const formatHeight = (value) => {
    const feet = Math.floor(value / 12);
    const inches = value % 12;
    return `${feet}'${inches}"`; 
  };

  // Function to handle changes in the slider
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

  // Function to handle image changes, validate image size and type
  const handleImageChange = (e) => {
  if (e.target.files.length) {
    const file = e.target.files[0];
    if (file.size > 2097152) {
      setSnackbarMessage('Image size should not exceed 2MB.');
      setOpenSnackbar(true);
      return;
    }
    if (!file.type.match('image.*')) {
      setSnackbarMessage('Please select a valid image file.');
      setOpenSnackbar(true);
      return;
    }
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setDetails((prevDetails) => ({
      ...prevDetails,
      image: imageUrl, // Immediately update the local display
    }));
  }
};

// Function to fetch image URL from the server, presigned url for S3 upload
  const fetchAndSetImageUrl = async (objectKey) => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/get-image-url?objectKey=${encodeURIComponent(objectKey)}`);
      setDetails((prevDetails) => ({
        ...prevDetails,
        imageUrl: response.data.url, // The signed URL for the image
      }));
    } catch (error) {
      console.error('Error fetching image URL:', error);
      setSnackbarMessage('Failed to fetch image.');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Upload image to S3 if a new image was selected
    if (imageFile) {
      try {
        const presignedResponse = await axios.get(`${config.apiUrl}/api/upload-url`, {
          params: { fileName: encodeURIComponent(imageFile.name), fileType: encodeURIComponent(imageFile.type) }
        });
        const presignedUrl = presignedResponse.data.url;
  
        await axios.put(presignedUrl, imageFile, {
          headers: { 'Content-Type': imageFile.type }
        });
  
        const objectKey = imageFile.name;
  
        const imageUrl = `https://arcanium.s3.eu-north-1.amazonaws.com/${objectKey}`;
  
        updateCharacter({
          ...character,
          details: {
            ...details,
            image: imageUrl, 
            hairColor,
            eyeColor,
            alignment: selectedAlignment,
          }
        });
  
        nextStep();
      } catch (error) {
        console.error('Error uploading image to S3:', error);
        setSnackbarMessage('Failed to upload image.');
        setOpenSnackbar(true);
      }
    } else {
      updateCharacter({
        ...character,
        details: { ...details, hairColor, eyeColor, alignment: selectedAlignment }
      });
      nextStep();
    }
  };

  return (
    <Box sx={{
      mt: 2,
      '@media (max-width:600px)': {
        paddingLeft: '70px', // Shifts entire content slightly to the right on mobile
      }
    }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          p: 3,
          backgroundColor: '#343a40', // Dark theme for the form background
          color: '#FFFFFF', 
          maxWidth: 800, 
          margin: 'auto',
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{  color: '#FFFFFF' }}>
          Character Details
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={details.image || defaultAvatarUrl}
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
              min={50} 
              max={300} 
            />
          </Grid>

          {/* Color pickers */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{  color: '#FFFFFF' }}>
              Hair Color
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HexColorPicker color={hairColor} onChange={setHairColor} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
              Eye Color
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <HexColorPicker color={eyeColor} onChange={setEyeColor} />
            </Box>
          </Grid>
          {/* Alignment selection */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
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
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme => theme.spacing(0.5),
      border: 0,
      color: '#FFFFFF', 
      '&.Mui-selected, &.Mui-selected:hover': {
        color: '#FFFFFF', 
        backgroundColor: theme => theme.palette.primary.main,
      },
    },
  }}
>
  {alignments.map((alignment) => (
    <ToggleButton key={alignment} value={alignment} aria-label={alignment} sx={{ color: '#FFFFFF' }}> 
      {alignment}
    </ToggleButton>
  ))}
</ToggleButtonGroup>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
            Set Character Details
          </Button>
          {/* Snackbar for error messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}

export default CharacterDetailsForm;
