import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ProductLink from 'react-storefront/ProductLink'
import { Vbox } from 'react-storefront/Box'
import Rating from 'react-storefront/Rating'
import { price } from 'react-storefront/format'
import Track from 'react-storefront/Track'
import { observer } from 'mobx-react'

import ProductColors from 'react-storefront/ProductColors'
import ProductThumbnail from 'react-storefront/ProductThumbnail'

@withStyles(theme => ({
  root: {
    listStyle: 'none',
    padding: '10px 0'
  },
  name: {
    marginBottom: 5
  },
  thumb: {
    flex: 2,
    display: 'block',
    marginBottom: '10px',
    '& img': {
      width: '100%'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  price: {
    color: theme.palette.price.main,
    marginTop: '5px'
  },
  reviews: {
    marginTop: '5px'
  },
  reviewCount: {
    marginLeft: '2px'
  },
  info: {
    margin: '0'
  }
}))
@observer
export default class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    classes: PropTypes.object
  }

  render() {
    const { index, product, classes } = this.props

    return (
      <div id={`item-${index}`} className={classes.root}>
        <Vbox alignItems="stretch">
          <div className={classes.thumb}>
            <Track
              trigger={{
                onClick: 'productClicked',
                onVisible: 'productImpression'
              }}
              product={product}
            >
              <ProductLink prefetch="visible" className={classes.link} product={product}>
                <ProductThumbnail
                  quality={50}
                  lazy={index >= 4 && index < 10}
                  aspectRatio={100}
                  alt="product"
                  product={product}
                />
              </ProductLink>
            </Track>
          </div>
          <div className={classes.info}>
            <Typography variant="subtitle1" className={classes.name}>
              {product.name}
            </Typography>
            <ProductColors showSelectedText strikeThroughDisabled product={product} />
            <Rating product={product} className={classes.rating} />
            <Typography className={classes.price}>{price(product.price)}</Typography>
          </div>
        </Vbox>
      </div>
    )
  }
}
