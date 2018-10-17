import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import CheckoutButton from 'react-storefront/CheckoutButton'
import CartItem from './CartItem'
import { observer, inject } from 'mobx-react'

@inject(({ app, history }) => ({ cart: app.cart, history }))
@observer
export default class Cart extends Component {
  
  render() {
    const { cart } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="title">Cart</Typography>
        </Row>
        <Row>
          { cart.items.length ? (
            cart.items.map((product, i) => (
              <CartItem key={i} product={product}/>
            ))
          ) : (
            <Typography variant="body2">There are no items in your cart.</Typography>
          )}
        </Row>
        <CheckoutButton docked/>
      </Container>
    )
  }

  goToCheckout = () => {
    this.props.history.push('/checkout')
  }

}