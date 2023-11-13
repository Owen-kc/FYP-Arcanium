import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6610f2', // This is Bootstrap's primary purple color
      contrastText: '#ffffff', // Ensures text is readable on primary color
    },
    secondary: {
      main: '#6f42c1', // A secondary purple color for accents
    },
    background: {
      default: '#282c34', // A dark grey, similar to the Bootstrap dark background
      paper: '#343a40', // Slightly lighter grey for elements like cards and dialogs
    },
    text: {
      primary: '#ffffff', // For primary text on light backgrounds
      secondary: 'rgba(255, 255, 255, 0.7)', // For secondary text on light backgrounds
      disabled: 'rgba(255, 255, 255, 0.5)', // For disabled text on light backgrounds
    },
  },
  typography: {
    fontFamily: '"Tangerine", serif', // Maintain your fantasy font choice here
    h6: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: 0.5,
      color: '#ffffff', // Ensures headers are readable on the dark background
    },
    button: {
      textTransform: 'none',
      color: '#ffffff', // Ensures button text is readable
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#343a40', // Dark grey for AppBar to fit the theme
          borderBottom: '2px solid #6610f2', // Adding a purple border
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#ffffff', // White text for primary buttons for better readability
          '&:hover': {
            backgroundColor: '#563d7c', // A purple tint for hover state
          },
        },
      },
    },
    // Other component overrides as needed
  },
});

export default theme;
