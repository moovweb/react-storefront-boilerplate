import React from 'react'
import { withStyles } from '@material-ui/core'
import Container from 'react-storefront/Container'

const styles = theme => ({
  root: {
    padding: '70px 0'
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  col: {
    flex: '1 0 300px',
    paddingBottom: '30px',
    '& a': {
      display: 'block',
      fontSize: '14px',
      textDecoration: 'none',
      color: theme.palette.dark,
      padding: '5px 0',
      '&:hover': {
        opacity: '0.7'
      }
    }
  },
  title: {
    fontSize: '18px',
    color: theme.palette.dark,
    fontWeight: '500',
    paddingBottom: '10px'
  },
})

const PromotedCards = ({ classes }) => (
  <div className={classes.root}>
    <Container className={classes.container}>
      <div className={classes.col}>
        <div className={classes.title}>About us</div>
        <a href="/">Who we are</a>
        <a href="/">Quality in the details</a>
        <a href="/">Customer reviews</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Departments</div>
        <a href="/">Women fashion</a>
        <a href="/">Men fashion</a>
        <a href="/">Kids wear</a>
        <a href="/">Home</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Help</div>
        <a href="/">Customer service</a>
        <a href="/">Size guide</a>
        <a href="/">Contact us</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Payments & delivery</div>
        <a href="/">Purchase items</a>
        <a href="/">Guarantee</a>
      </div>
    </Container>
  </div>
)

export default withStyles(styles)(PromotedCards)
