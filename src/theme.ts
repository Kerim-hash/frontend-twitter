// @ts-nocheck

import { createTheme } from '@mui/material/styles';
import { green, purple, red } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    // 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif
    fontFamily: ['Rubik', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h2: {
      fontWeight: 800,
      fontSize: 64,
      lineHeight: "80px",
    },
    h4: {
      fontWeight: 800,
      fontSize: 31,
      lineHeight: "40px",
    },
    h5: {
      fontWeight: 700,
      fontSize: 20
    },
    body1: {
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      textTransform: "none"
    }
  },

  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      dark: 'rgb(26, 145, 218)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(26, 145, 218)',
    },
    error: {
      main: red.A400,
    },
    action: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#1d9bfo',
      secondary: '#46505A',
      lightBlue: 'rgb(29, 161, 242)',
    },
  },

  

  components: {
   
    MuiButton: {
      styleOverrides: {
        root: {
          height: 45,
          textTransform: 'none',
          borderRadius: 30,
          fontSize: 16,
          fontWeight: 700,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          minWidth: 500
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          height: 45,
          color: "black",
          textTransform: 'none',
          borderRadius: 50,
          fontSize: 16,
          fontWeight: 700,
        },

      },
    }
  },

  overrides: {
    MuiFormControl: {
      root: {
        width: "100%",
        borderRadius: 8,
        "& .MuiOutlinedInput-input": {
          borderRadius: 30,
          boxShadow: "0px 1px 0px #E2E8F0",
        },
      }
    },
    MuiFilledInput: {
      root: {
        border: "1px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#fcfcfb",
        "&:hover": {
          backgroundColor: "#fff"
        },
        "&$focused": {
          backgroundColor: "#fff",
        }
      }
    }

  }



});