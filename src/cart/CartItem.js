import React, { Component } from 'react'
import { withStyles, Paper, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import QuantitySelector from 'react-storefront/QuantitySelector'
import { price } from 'react-storefront/format'
import { Hbox } from 'react-storefront/Box'
import { observer, inject } from 'mobx-react'
import Track from 'react-storefront/Track'
import Image from 'react-storefront/Image'
import CloseIcon from '@material-ui/icons/Close'
import ProductLink from 'react-storefront/ProductLink'

@withStyles(theme => ({
  root: {
    flex: 1,
    padding: `${theme.margins.container}px 40px ${theme.margins.container}px ${theme.margins.container}px`,
    marginBottom: `${theme.margins.container}px`,
    position: 'relative'
  },
  thumb: {
    marginRight: `${theme.margins.container}px`,
    width: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100px'
    }
  },
  label: {
    marginRight: '5px'
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}))
@inject(({ app }) => ({ cart: app.cart }))
@observer
export default class CartItem extends Component {
  
  render() {
    const { classes, product } = this.props
    
    return (
      <Paper className={classes.root}>
        <Hbox alignItems="flex-start">
          <div className={classes.thumb}>
            <Image src={product.images[0]} fill aspectRatio={100}/>
          </div>
          <div className={classes.info}>
            <ProductLink product={product}>
              <Typography variant="subtitle1">{product.name}</Typography>
            </ProductLink>
            <Typography className={classes.price}>{ price(product.price) }</Typography>
            { product.size.selected && (
              <Hbox>
                <Typography className={classes.label}>Size:</Typography>
                <Typography>{product.size.selected.text}</Typography>
              </Hbox>
            )}
            <Row>
              <Typography>Quantity:</Typography>
              <QuantitySelector product={product}/>
            </Row>
          </div>
        </Hbox>
        <Track event="removedFromCart" product={product}>
          <IconButton className={classes.remove} onClick={this.remove}>
            <CloseIcon/>
          </IconButton>
        </Track>
      </Paper>
    )
  }

  remove = () => {
    this.props.cart.remove(this.props.product)
  }

}