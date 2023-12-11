import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6610f2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6f42c1',
    },
    background: {
      default: '#282c34',
      paper: '#343a40',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    fontFamily: '"Tangerine", serif',
    h6: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: 0.5,
      color: '#ffffff',
    },
    button: {
      textTransform: 'none',
      color: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#343a40',
          borderBottom: '2px solid #6610f2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#563d7c',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
        
        },
        input: {
          color: 'rgba(255, 255, 255, 0.87)', // Light text color for visibility
        },
      },
    },
  },
});

export default theme;
