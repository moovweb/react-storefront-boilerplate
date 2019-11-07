import React from 'react'
import { withStyles } from '@material-ui/core'
import Container from 'react-storefront/Container'
import classnames from 'classnames'
import mobileAppImage from './mobile-app.png'
import buttonApple from './apple.png'
import buttonGoogle from './google.png'

const styles = theme => ({
  root: {},
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    flex: '0 1 520px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  appImage: {
    flex: '0',
    [theme.breakpoints.up('md')]: {
      paddingRight: '30px'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  subtitle: {
    fontSize: '24px',
    color: '#a3a5ad'
  },
  title: {
    fontSize: '36px',
    color: theme.palette.dark,
    fontWeight: '500'
  },
  buttons: {
    paddingTop: '20px',
    margin: '0 -10px',
    '& button': {
      margin: '5px 10px'
    }
  },
  buttonApp: {
    background: `url('${buttonApple}') no-repeat`,
    padding: '23px 48px',
    cursor: 'pointer',
    color: 'transparent',
    border: 0,
    '&:focus': {
      outline: 'none'
    }
  },
  buttonApple: {
    background: `url('${buttonApple}') no-repeat`
  },
  buttonGoogle: {
    background: `url('${buttonGoogle}') no-repeat`
  }
})

const MobileAppBanner = ({ classes }) => (
  <div className={classes.root}>
    <Container className={classes.container}>
      <div className={classes.content}>
        <div className={classes.subtitle}>Fashion to Take Away</div>
        <div className={classes.title}>Download our application to your mobile</div>
        <div className={classes.buttons}>
          <button className={classnames(classes.buttonApp, classes.buttonApple)}>open app store</button>
          <button className={classnames(classes.buttonApp, classes.buttonGoogle)}>open google play</button>
        </div>
      </div>
      <img className={classes.appImage} src={mobileAppImage} alt="react storefront app" />
    </Container>
  </div>
)

export default withStyles(styles)(MobileAppBanner)
