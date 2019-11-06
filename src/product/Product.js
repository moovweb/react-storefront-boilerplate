import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import Paper from '@material-ui/core/Paper'
import { observer, inject } from 'mobx-react'
import { withStyles, Hidden } from '@material-ui/core'
import { price } from 'react-storefront/format'
import AddToCartButton from './components/AddToCartButton'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import AmpState from 'react-storefront/amp/AmpState'
import AmpForm from 'react-storefront/amp/AmpForm'
import ProductRating from './../shared/ProductRating'
import SizeSelector from './components/SizeSelector'
import ColorSelector from './components/ColorSelector'
import TabPanel from 'react-storefront/TabPanel'
import CmsSlot from 'react-storefront/CmsSlot'
import classnames from 'classnames'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import withPersonalization from 'react-storefront/personal/withPersonalization'
import Recommendations from './Recommendations'
import Lazy from 'react-storefront/Lazy'
import ProductImages from './components/ProductImages'

export const styles = theme => ({
  root: {
    paddingBottom: '50px'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  images: {
    [theme.breakpoints.up('md')]: {
      width: '450px',
      margin: '0 30px'
    }
  },
  selectionControls: {
    flex: 0,
    [theme.breakpoints.up('md')]: {
      margin: '0 30px'
    }
  },
  label: {
    marginBottom: '7px'
  },
  review: {
    padding: '10px',
    marginBottom: '10px'
  },
  header: {
    fontSize: '2.25rem'
  },
  controlsRow: {
    marginBottom: 40
  },
  lazyContainer: {
    minHeight: 295,
    paddingBottom: 40
  },
  recommendations: {
    maxWidth: '790px',
    margin: '0 auto'
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
                <div className={classes.images}>
                  <ProductImages product={product} />
                </div>
                <div className={classes.selectionControls}>
                  <Lazy className={classes.lazyContainer} key={product.id}>
                    <Hidden xsDown implementation="css">
                      <Header product={product} />
                    </Hidden>
                    <Row className={classes.controlsRow}>
                      <Typography variant="subtitle1" className={classnames(classes.label)}>
                        Color:
                      </Typography>
                      <ColorSelector
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
                    <Row className={classes.controlsRow}>
                      <Typography variant="subtitle1" className={classnames(classes.label)}>
                        Size:
                      </Typography>
                      <SizeSelector name="size" model={product.size} strikeThroughDisabled />
                    </Row>
                    <Row className={classes.controlsRow}>
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
                    </Row>
                  </Lazy>
                  <AddToCartButton
                    product={product}
                    confirmation="This item has been added to your cart."
                  />
                </div>
              </div>
            </Row>
            <Lazy style={{ minHeight: 500 }} key={product.id}>
              {!amp && (
                <Row className={classes.recommendations}>
                  <Recommendations product={product} />
                </Row>
              )}
            </Lazy>
          </Container>
        </AmpForm>
      </AmpState>
    )
  }
}

@withStyles(theme => ({
  title: {
    [theme.breakpoints.up('md')]: {
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
          <Typography variant="h4" component="h1">
            {product.name}
          </Typography>
        </Row>
        <Row>
          <Hbox>
            <Typography variant="subtitle1">{price(product.price)}</Typography>
            <ProductRating product={product} className={classes.rating} />
          </Hbox>
        </Row>
      </div>
    )
  }
}
