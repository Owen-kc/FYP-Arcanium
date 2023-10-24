import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a2d2a', // A deep, earthy brown
    },
    secondary: {
      main: '#d4aa5c', // A rich, golden color reminiscent of old manuscripts or gold coins
    },
    background: {
      default: '#f4e9d8', // A parchment-like background color
    },
  },
  typography: {
    fontFamily: '"Tangerine", serif', // Assume you have a fantasy font like 'Tangerine' loaded
    h6: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: 0.5,
    },
    button: {
      textTransform: 'none', // Makes button text appear more like regular text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#f4e9d8', // Parchment-like color for AppBar
          borderBottom: '2px solid #4a2d2a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#d4aa5c', // Golden text for primary buttons
        },
      },
    },
  },
});

export default theme;
