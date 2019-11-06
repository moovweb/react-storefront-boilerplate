import { withStyles } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-storefront/Rating'
import Star from '@material-ui/icons/Star'

const styles = theme => ({
  full: {
    '& > path': {
      color: theme.palette.secondary.main
    }
  },
  empty: {
    '& > path': {
      color: theme.palette.dark
    }
  }
})

const ProductRating = ({ product, classes }) => (
  <Rating
    product={product}
    iconEmpty={() => <Star className={classes.empty} />}
    iconFull={() => <Star className={classes.full} />}
    iconHalf={() => <Star className={classes.empty} />}
  />
)

ProductRating.propTypes = {
  product: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductRating)
