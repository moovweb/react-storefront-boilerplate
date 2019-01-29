import createTheme from 'react-storefront/createTheme'
import red from '@material-ui/core/colors/red'

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: {
      main: red[700],
      light: red[600],
      dark: red[800],
      contrasText: '#fff'
    },
    spacing: {
      container: 15,
      row: 15
    }
  },
  overrides: {
    RSFLoadMask: {
      fullscreen: {
        height: `calc(100vh - 181px)`
      }
    }
  }
});

export default theme