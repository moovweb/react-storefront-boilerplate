import React, { Fragment } from 'react'
import { withStyles, Hidden } from '@material-ui/core'
import ImageSwitcher from 'react-storefront/ImageSwitcher'
import Image from 'react-storefront/Image'
import { observer } from "mobx-react"

const styles = theme => ({
  imageSwitcher: {
    marginTop: 10,

    [theme.breakpoints.up('md')]: {
      width: '450px',
      height: '450px'
    },

    [theme.breakpoints.down('sm')]: {
      margin: `0 -${theme.margins.container}px`,
      width: '100vw',
      height: 'calc(100vw + 73px)'
    }
  },
  switcherImage: {
    width: '450px',
    height: '450px',
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
})

const ProductImages = ({ product, classes }) => {
  const firstImageSrc = typeof product.images[0] === 'object' ? product.images[0].src : product.images[0]

  return (
  <Fragment>
    <Hidden mdDown implementation="css">
      <Image src={firstImageSrc} alt={product.images[0].alt} classes={{ root: classes.switcherImage }} contain />
    </Hidden>
    <ImageSwitcher
      classes={{ root: classes.imageSwitcher }}
      product={product}
      imageProps={{ quality: 80, contain: true, classes: { root: classes.switcherImage } }}
      indicators
    />
  </Fragment>
)
  }

export default withStyles(styles)(observer(ProductImages))
