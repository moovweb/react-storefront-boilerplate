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
        <a href="/static/who-we-are">Who we are</a>
        <a href="/static/quality">Quality in the details</a>
        <a href="/static/customer-reviews">Customer reviews</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Departments</div>
        <a href="/static/women-fashion">Women fashion</a>
        <a href="/static/men-fashion">Men fashion</a>
        <a href="/static/kids-wear">Kids wear</a>
        <a href="/">Home</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Help</div>
        <a href="/static/customer-service">Customer service</a>
        <a href="/static/size-guide">Size guide</a>
        <a href="/static/contact-us">Contact us</a>
      </div>
      <div className={classes.col}>
        <div className={classes.title}>Payments & delivery</div>
        <a href="/static/purchase-items">Purchase items</a>
        <a href="/static/guarantee">Guarantee</a>
      </div>
    </Container>
  </div>
)

export default withStyles(styles)(PromotedCards)
