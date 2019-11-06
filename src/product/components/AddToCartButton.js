import React from 'react'
import { withStyles } from '@material-ui/core'
import BaseAddToCartButton from 'react-storefront/AddToCartButton'
import QuantitySelector from 'react-storefront/QuantitySelector'

const styles = theme => ({
  root: {
    borderRadius: 0,
    padding: '12px 60px',
    background: theme.palette.primary.main,
    boxShadow: 'none',
    flex: '0 1 auto',
    '&:hover': {
      background: theme.palette.primary.c500,
    },
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1
    }
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.subheading.fontSize,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      borderRadius: '0'
    }
  },
  quantity: {
    flex: '0 0 100px',
    backgroundColor: theme.palette.gray
  }
})

const AddToCartButton = ({ classes, ...props }) => (
  <div className={classes.container}>
    <QuantitySelector name="quantity" className={classes.quantity} product={props.product}/>
    <BaseAddToCartButton classes={classes} {...props} />
  </div>
)

export default withStyles(styles)(AddToCartButton)
