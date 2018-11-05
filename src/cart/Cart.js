import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import CheckoutButton from 'react-storefront/CheckoutButton'
import CartItem from './CartItem'
import { observer, inject } from 'mobx-react'
import { Grid, withStyles, Hidden } from '@material-ui/core'
import { price } from 'react-storefront/format'
import Divider from 'react-storefront/Divider'
import Spacer from 'react-storefront/Spacer'
import { Hbox } from 'react-storefront/Box'

@withStyles(theme => ({
  root: {
    paddingBottom: '64px'
  },
  checkoutPanel: {
    backgroundColor: theme.palette.grey['200'],
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.margins.container}px`
  },
  total: {
    fontWeight: 'bold'
  },
  checkoutButton: {
    width: '100%'
  }
}))
@inject(({ app, history }) => ({ cart: app.cart, history }))
@observer
export default class Cart extends Component {
  
  render() {
    const { cart, classes } = this.props

    return (
      <Container className={classes.root}>
        <Row>
          <Typography variant="h6">My Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</Typography>
        </Row>
        <Row>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={8}>
              { cart.items.length ? (
                cart.items.map((product, i) => (
                  <CartItem key={i} product={product}/>
                ))
              ) : (
                <Typography variant="body1">There are no items in your cart.</Typography>
              )}
            </Grid>
            { cart.empty ? null : (
              <Grid item xs={12} sm={4}>
                <div className={classes.checkoutPanel}>
                  <Hbox alignItems="flex-start">
                    <div>
                      <Typography variant="subtitle2" className={classes.total}>Estimated Total</Typography>
                      <Typography variant="caption">Tax calculated in checkout</Typography>
                    </div>
                    <Spacer/>
                    <Typography variant="subtitle2" className={classes.total}>{price(cart.total)}</Typography>
                  </Hbox>
                  <Hidden xsDown implementation="css">
                    <Row>
                      <Divider/>
                    </Row>
                  </Hidden>
                  { cart.items.length === 0 ? null : (
                    <Fragment>
                      <Hidden smUp implementation="css">
                        <CheckoutButton className={classes.checkoutButton} docked/>
                      </Hidden>
                      <Hidden xsDown implementation="css">
                        <CheckoutButton className={classes.checkoutButton}/>
                      </Hidden>
                    </Fragment>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
        </Row>
      </Container>
    )
  }

  goToCheckout = () => {
    this.props.history.push('/checkout')
  }

}