import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import BackToTop from 'react-storefront/BackToTop'
import Container from 'react-storefront/Container'
import { withStyles } from '@material-ui/core'
import ProductItem from './ProductItem'
import FilterButton from 'react-storefront/FilterButton'
import Filter from 'react-storefront/Filter'
import SortButton from 'react-storefront/SortButton'
import ShowMore from 'react-storefront/ShowMore'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import { Hbox, Vbox } from 'react-storefront/Box'
import Hidden from '@material-ui/core/Hidden'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import LoadMask from 'react-storefront/LoadMask'

@withStyles(theme => ({
  header: {
    margin: '20px 0'
  },
  description: {
    margin: '0 0 20px 0'
  },
  headerContainer: {
    justifyContent: 'space-between',
    padding: '1.85rem 0',
    borderTop: '1px solid #f1f2f3',
    borderBottom: '1px solid #f1f2f3'
  },
  headerButton: {
    [theme.breakpoints.down('xs')]: {
      flex: 1
    },

    backgroundColor: 'transparent',
    position: 'relative',

    '&:hover': {
      backgroundColor: 'transparent'
    },

    '& ul': {
      paddingTop: 0,
      paddingBottom: 0,
    }
  },
  total: {
    margin: '10px 0',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right'
    }
  },
  sidebar: {
    marginRight: `${theme.margins.container * 2}px`,
    marginTop: `${theme.margins.container - 5}px`,
    width: '200px'
  }
}))
@inject(({ app }) => ({ subcategory: app.subcategory }))
@observer
export default class Subcategory extends Component {
  render() {
    const { classes, subcategory } = this.props

    if (!subcategory) return null

    return (
      <Fragment>
        <Breadcrumbs />
        <BackToTop />
        <Container className={classes.root} key={subcategory.id}>
          <Hbox alignItems="flex-start">
            <Hidden xsDown implementation="css">
              <Vbox className={classes.sidebar}>
                <Filter model={subcategory} margins={false} expandAll refreshOnChange />
              </Vbox>
            </Hidden>
            <Vbox flex="1" style={{ position: 'relative' }}>
              {subcategory.loading && <LoadMask transparent show align="top" />}
              <Hidden smUp implementation="css">
                <Hbox split>
                  <FilterButton model={subcategory} className={classes.headerButton} />
                  <div style={{ width: '15px' }} />
                  <SortButton model={subcategory} className={classes.headerButton} />
                </Hbox>
              </Hidden>

              <Hbox className={classes.headerContainer}>
                <Hidden xsDown implementation="css">
                  <SortButton
                    model={subcategory}
                    className={classes.headerButton}
                    title="Sort by:"
                    variant="menu"
                    style={{ marginLeft: '10px' }}
                  />
                </Hidden>
                <Typography variant="caption" className={classes.total}>
                  Products found: <strong>{subcategory.total}</strong>
                </Typography>
              </Hbox>

              <ResponsiveTiles>
                {subcategory.items.map((product, i) => (
                  <ProductItem index={i} key={i} product={product} />
                ))}
              </ResponsiveTiles>

              <ShowMore key={subcategory.page} model={subcategory} />
            </Vbox>
          </Hbox>
        </Container>
      </Fragment>
    )
  }
}
