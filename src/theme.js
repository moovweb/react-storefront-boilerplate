import createTheme from 'react-storefront/createTheme'
import blue from '@material-ui/core/colors/blue'

const FontFamily = {
  Roboto: 'Roboto, sans-serif',
  Raleway: 'Raleway, sans-serif'
};

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      '"Raleway"',
      'sans-serif'
    ].join(','),
    subtitle1: {
      fontFamily: FontFamily.Raleway,
      fontSize: '.875rem',
      fontWeight: 300,
      lineHeight: 1.6,
      margin: '.25rem 0',

      '@media (min-width: 1024px)': {
        margin: '.5rem 0 .25rem',
        fontSize: '1rem',
      }
    },
    caption: {
      fontFamily: FontFamily.Roboto,
      fontSize: '.875rem',
      fontWeight: 300,
      color: '#bebfc4',

      '& > strong': {
        fontWeight: 500,
        color: '#1d1f22',
      }
    },
  },
  palette: {
    dark: '#1d1f22',
    gray: '#fafafC',
    price: {
      main: '#1d1f22'
    },
    secondary: {
      main: '#28a4ea',
      light: '#53b6ee',
      dark: '#3d3c44',
      contrastText: '#fff'
    },
    price: {
      full: '#000',
      main: '#000',
      sale: '#900'
    }
  },
  spacing: {
    container: 15,
    row: 15
  },
  slideshowGallery: {
    collection: {
      marginBottom: '5rem',
      width: 'min-content',
      paddingLeft: '36px',
      fontSize: '.75rem',
      textTransform: 'uppercase',
      borderLeft: '1px solid #bebfc4',
      color: '#bebfc4',
      textTransform: 'uppercase',
      fontFamily: FontFamily.Roboto
    },
    slogan: {
      color: '#1d1f22',
      fontSize: '2.25rem',
      lineHeight: 1.38,
      fontFamily: FontFamily.Raleway
    },
    button: {
      padding: '1rem 2.5rem',
      fontSize: '.875rem',
      border: 'none',
      outline: 'none',
      color: '#fff',
      backgroundColor: '#5ece7b',
      fontFamily: FontFamily.Raleway,
      fontWeight: 400,
      lineHeight: 1.6,
      textTransform: 'uppercase',
      cursor: 'pointer',
      margin: '0',

      '&:hover': {
        backgroundColor: '#72d48b',
      }
    }
  },
  overrides: {
    RSFLoadMask: {
      fullscreen: {
        height: `calc(100vh - 181px)`
      }
    },
    RSFActionButton: {
      fontSize: '.875rem',
      alignContent: 'center',

      caption: {
        color: '#bebfc4',
        fontFamily: FontFamily.Roboto,
        fontWeight: 300,
      },
      value: {
        color: '#1d1f22',
        fontFamily: FontFamily.Raleway,
        fontSize: 'inherit',
        fontWeight: 400,
        lineHeight: 1.6,
      }
    },
    RSFResponsiveTiles: {
      tile: {
        padding: 0
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '.875rem',
      }
    },
    MuiGridListTile: {
      tile: {
        transition: 'box-shadow, .15s',
        boxShadow: '0 4px 35px transparent',

        '&:hover': {
          boxShadow: '0 4px 35px rgba(168,172,176,.19)',
        }
      }
    }
  }
})

export default theme
