import createTheme from 'react-storefront/createTheme'

const theme = createTheme({
  palette: {
    addToCart: {
      background: 'green',
      contrastText: 'white'
    },
    spacing: {
      container: 15,
      row: 15
    }
  }
});

export default theme