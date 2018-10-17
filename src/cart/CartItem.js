import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import QuantitySelector from 'react-storefront/QuantitySelector'
import { price } from 'react-storefront/format'
import { Hbox } from 'react-storefront/Box'
import { observer, inject } from 'mobx-react'
import Button from '@material-ui/core/Button'
import Track from 'react-storefront/Track'

@withStyles(theme => ({
  thumb: {
    marginRight: `${theme.margins.container}px`
  }
}))
@inject(({ app }) => ({ cart: app.cart }))
@observer
export default class CartItem extends Component {
  
  render() {
    const { classes, product } = this.props
    
    return (
      <div>
        <Hbox alignItems="flex-start">
          <div className={classes.thumb}>
            <img alt="product" src={product.thumbnails[0]}/>
          </div>
          <div className={classes.info}>
            <Typography variant="subheading">{product.name}</Typography>
            <Typography className={classes.price}>{ price(product.price) }</Typography>
            <Row>
              <QuantitySelector product={product}/>
            </Row>
          </div>
        </Hbox>
        <Row>
          <Track event="removedFromCart" product={product}>
            <Button size="small" variant="raised" onClick={this.remove}>Remove from Cart</Button>
          </Track>
        </Row>
      </div>
    )
  }

  remove = () => {
    this.props.cart.remove(this.props.product)
  }

}