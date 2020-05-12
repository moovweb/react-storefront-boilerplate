import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from 'react-storefront/Container'
import { observer, inject } from 'mobx-react'
import { withStyles, Hidden } from '@material-ui/core'
import ImageSwitcher from 'react-storefront/ImageSwitcher'
import { price } from 'react-storefront/format'
import QuantitySelector from 'react-storefront/QuantitySelector'
import AddToCartButton from 'react-storefront/AddToCartButton'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import AmpState from 'react-storefront/amp/AmpState'
import AmpForm from 'react-storefront/amp/AmpForm'
import Rating from 'react-storefront/Rating'
import ButtonSelector from 'react-storefront/ButtonSelector'
import TabPanel from 'react-storefront/TabPanel'
import CmsSlot from 'react-storefront/CmsSlot'
import classnames from 'classnames'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import withPersonalization from 'react-storefront/personal/withPersonalization'
import Recommendations from './Recommendations'
import Lazy from 'react-storefront/Lazy'
import Carousel from 'react-storefront/Carousel'

export const styles = theme => ({
  root: {
    paddingBottom: '50px'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  imageSwitcher: {
    width: '400px',
    height: '473px',
    margin: `0 ${theme.margins.container * 2}px 0 0`,

    [theme.breakpoints.up('md')]: {
      width: '500px',
      height: '573px'
    },

    [theme.breakpoints.down('xs')]: {
      margin: `0 -${theme.margins.container}px`,
      width: '100vw',
      height: 'calc(100vw + 73px)'
    }
  },
  selectionControls: {
    flex: 0,
    [theme.breakpoints.up('sm')]: {
      flex: 1
    }
  },
  label: {
    marginBottom: '10px'
  },
  review: {
    padding: '10px',
    marginBottom: '10px'
  },
  slide: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
    color: 'white'
  }
})

@withStyles(styles)
@withPersonalization(app => app.product) // automatically calls ProductModel.loadPersonalization() when the user views a product
@inject('app')
@observer
export default class Product extends Component {
  render() {
    const {
      app: { product, amp },
      classes
    } = this.props

    if (!product) return null

    return (
      <AmpState initialState={product}>
        <AmpForm id="form" action="/cart/add-from-amp.json" method="post">
          {/* These hidden fields are needed for AMP */}
          <input type="hidden" name="id" value={product.id} />
          <input type="hidden" name="name" value={product.name} />

          <Breadcrumbs />

          <Container className={classes.root}>
            <Hidden smUp implementation="css">
              <Header product={product} />
            </Hidden>
            <Row>
              <div className={classes.mainContainer}>
                <ImageSwitcher
                  classes={{ root: classes.imageSwitcher }}
                  product={product}
                  imageProps={{ quality: 80 }}
                  loadingThumbnailProps={{ quality: 50 }}
                  indicators
                />
                <div className={classes.selectionControls}>
                  <Lazy style={{ minHeight: 295 }}>
                    <Hidden xsDown implementation="css">
                      <Header product={product} />
                    </Hidden>
                    <Row>
                      <Typography className={classnames(classes.label)}>Color</Typography>
                      <ButtonSelector
                        name="color"
                        model={product.color}
                        showSelectedText
                        strikeThroughDisabled
                        onSelectionChange={(e, item) => {
                          e.preventDefault()
                          product.color.setSelected(item)
                          product.fetchImages()
                        }}
                      />
                    </Row>
                    <Row className={classes.size}>
                      <Typography className={classnames(classes.label)}>Size</Typography>
                      <ButtonSelector
                        name="size"
                        model={product.size}
                        strikeThroughDisabled
                        strikeThroughAngle={32}
                      />
                    </Row>
                    <Row>
                      <Hbox>
                        <div style={{ marginRight: '15px' }}>Quantity:</div>
                        <QuantitySelector name="quantity" product={product} />
                      </Hbox>
                    </Row>
                  </Lazy>
                  <Hidden implementation="css" smUp>
                    <AddToCartButton
                      product={product}
                      docked
                      confirmation="This item has been added to your cart."
                    />
                  </Hidden>
                  <Hidden implementation="css" xsDown>
                    <AddToCartButton
                      product={product}
                      confirmation="This item has been added to your cart."
                    />
                  </Hidden>
                </div>
              </div>
            </Row>
            <Lazy style={{ minHeight: 500 }}>
              <TabPanel>
                <CmsSlot label="Description">{product.description}</CmsSlot>
                <CmsSlot label="Specs">{product.specs}</CmsSlot>
                <div label="Reviews">
                  {product.reviews.map((review, i) => (
                    <Paper key={i} className={this.props.classes.review}>
                      {review}
                    </Paper>
                  ))}
                </div>
              </TabPanel>
              {!amp && (
                <Row>
                  <Recommendations product={product} />
                </Row>
              )}
            </Lazy>
            <Lazy style={{ minHeight: 500 }}>
              <Typography className={classnames(classes.label)}>Customer Photos</Typography>
              <Carousel arrows indicators>
                <div className={classes.slide} style={{ backgroundColor: '#00a8ff' }}>
                  Photo #1
                </div>
                <div className={classes.slide} style={{ backgroundColor: '#9c88ff' }}>
                  Photo #2
                </div>
                <div className={classes.slide} style={{ backgroundColor: '#fbc531' }}>
                  Photo #3
                </div>
                <div className={classes.slide} style={{ backgroundColor: '#4cd137' }}>
                  Photo #4
                </div>
              </Carousel>
            </Lazy>
          </Container>
        </AmpForm>
      </AmpState>
    )
  }
}

@withStyles(theme => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0'
    }
  },
  rating: {
    marginLeft: '10px'
  }
}))
@observer
export class Header extends Component {
  render() {
    const { product, classes } = this.props

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
}
