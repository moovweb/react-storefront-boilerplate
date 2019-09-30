import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { Hbox } from 'react-storefront/Box'
import ProductItem from '../subcategory/ProductItem'
import withStyles from '@material-ui/core/styles/withStyles'
import { observer } from 'mobx-react'
import LoadMask from 'react-storefront/LoadMask'

const styles = theme => ({
  root: {
    height: '300px',
    position: 'relative'
  },
  carousel: {
    overflowX: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw',
      paddingBottom: '64px',
      margin: `0 ${theme.margins.container * -1}px`
    }
  },
  item: {
    marginRight: theme.spacing.unit * 1
  },
  thumb: {
    width: '150px',
    height: '150px'
  },
  info: {
    margin: '0 10px'
  }
})

/**
 * A mock component that demonstrates how we can late load and display
 * personalized product recommendations.
 */
@withStyles(styles)
@observer
export default class Recommendations extends Component {
  render() {
    const { product, classes } = this.props

    return (
      <div className={classes.root}>
        {product.recommendations ? (
          <>
            <Typography variant="subtitle1">Personalized Recommendations for You</Typography>
            <Hbox className={classes.carousel}>
              {product.recommendations.map((suggestion, i) => (
                <ProductItem
                  key={i}
                  product={suggestion}
                  classes={{ root: classes.item, thumb: classes.thumb, info: classes.info }}
                />
              ))}
            </Hbox>
          </>
        ) : (
          <LoadMask show />
        )}
      </div>
    )
  }
}
