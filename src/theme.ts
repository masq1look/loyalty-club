import { teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: '#ff6666'
    }
  }
});

export default theme;
