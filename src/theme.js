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