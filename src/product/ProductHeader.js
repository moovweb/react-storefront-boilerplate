import React from 'react'
import { observer } from 'mobx-react'
import { price } from 'react-storefront/format'
import Row from 'react-storefront/Row'
import Rating from 'react-storefront/Rating'
import { Hbox } from 'react-storefront/Box'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0'
    }
  },
  rating: {
    marginLeft: '10px'
  }
})

const ProductHeader = ({ product, classes }) => {
  return (
    <div>
      <Row className={classes.title}>
        <Typography variant="h6" component="h1">
          {product.name}
        </Typography>
      </Row>
      <Row>
        <Hbox>
          <Typography variant="subtitle1">{price(product.price)}</Typography>
          <Rating product={product} className={classes.rating} />
        </Hbox>
      </Row>
    </div>
  )
}

export default withStyles(styles)(observer(ProductHeader))
