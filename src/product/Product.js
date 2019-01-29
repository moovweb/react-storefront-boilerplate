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

export const styles = theme => ({
  root: {
    paddingBottom: '50px'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  imageSwitcher: {
    width: '400px',
    height: '473px',
    margin: `0 ${theme.margins.container*2}px 0 0`,
    
    [theme.breakpoints.up('md')]: {
      width: '500px',
      height: '573px',
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
      flex: 1,
    }
  },
  label: {
    marginBottom: '10px'
  },
  review: {
    padding: '10px',
    marginBottom: '10px'
  }
})

@withStyles(styles)
@inject(({ app }) => ({ product: app.product }))
@observer
export default class Product extends Component { 

  render() {
    const { product, classes } = this.props

    if (!product) return null

    return (
      <AmpState initialState={product}>
        <AmpForm id="form" action="/cart/add-from-amp.json">

          {/* These hidden fields are needed for AMP */}
          <input type="hidden" name="id" value={product.id}/>
          <input type="hidden" name="name" value={product.name}/>

          <Breadcrumbs/>

          <Container className={classes.root}>
            <Hidden smUp implementation="css">
              <Header product={product}/>
            </Hidden>
            <Row>
              <div className={classes.mainContainer}>
                <ImageSwitcher classes={{ root: classes.imageSwitcher }} product={product} indicators/>
                <div className={classes.selectionControls}>
                  <Hidden xsDown implementation="css">
                    <Header product={product}/>
                  </Hidden>
                  <Row>
                    <Typography className={classnames(classes.label)}>Color</Typography>
                    <ButtonSelector name="color" model={product.color} showSelectedText strikeThroughDisabled/>
                  </Row>
                  <Row className={classes.size}>
                    <Typography className={classnames(classes.label)}>Size</Typography>
                    <ButtonSelector name="size" model={product.size} strikeThroughDisabled strikeThroughAngle={32}/>
                  </Row>
                  <Row>
                    <Hbox>
                      <div style={{ marginRight: '15px' }}>Quantity:</div>
                      <QuantitySelector product={product}/>
                    </Hbox>
                  </Row>
                  <Hidden implementation="css" smUp>
                    <AddToCartButton product={product} docked confirmation="This item has been added to your cart."/>
                  </Hidden>
                  <Hidden implementation="css" xsDown>
                    <AddToCartButton product={product} confirmation="This item has been added to your cart."/>
                  </Hidden>
                </div>
              </div>
            </Row>
            <TabPanel>
              <CmsSlot label="Description">{product.description}</CmsSlot>
              <CmsSlot label="Specs">{product.specs}</CmsSlot>
              <div label="Reviews">
                {product.reviews.map((review, i) => (
                  <Paper key={i} className={this.props.classes.review}>{review}</Paper>
                ))}
              </div>
            </TabPanel>
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
          <Typography variant="h6" component="h1">{product.name}</Typography>
        </Row>
        <Row>
          <Hbox>
            <Typography variant="subtitle1">{price(product.price)}</Typography>
            <Rating product={product} className={classes.rating}/>
          </Hbox>
        </Row>
      </div>
    )
  }

}
