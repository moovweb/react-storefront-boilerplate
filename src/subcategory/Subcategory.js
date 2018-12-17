import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import { withStyles } from '@material-ui/core'
import ProductItem from './ProductItem'
import FilterButton from 'react-storefront/FilterButton'
import Filter from 'react-storefront/Filter'
import SortButton from 'react-storefront/SortButton'
import withAmp from 'react-storefront/amp/withAmp'
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
  headerButton: {
    [theme.breakpoints.down('xs')]: {
      flex: 1
    }
  },
  total: {
    margin: '10px 0',
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right'
    }
  },
  sidebar: {
    marginRight: `${theme.margins.container * 2}px`,
    marginTop: `${theme.margins.container - 5}px`,
    width: '200px'
  }
}), { name: 'RSFSubcategory' })
@withAmp
@inject(({ app }) => ({ subcategory: app.subcategory }))
@observer
export default class Subcategory extends Component { 

  render() {
    const { classes, subcategory } = this.props

    if (!subcategory) return null

    return (
      <Fragment>
        <Breadcrumbs/>
        <Container className={classes.root} key={subcategory.id}>
          <Hbox alignItems="flex-start">
            <Hidden xsDown implementation="css">
              <Vbox className={classes.sidebar}>
                <Filter model={subcategory} margins={false} expandAll refreshOnChange/>
              </Vbox>
            </Hidden>
            <Vbox flex="1" style={{ position: 'relative' }}>
              { subcategory.loading && (
                <LoadMask transparent show align="top"/> 
              )}
              <Typography variant="h6" component="h1" className={classes.header}>{subcategory.name}</Typography>
              <Typography className={classes.description}>{subcategory.description}</Typography>

              <Hidden smUp implementation="css">
                <Hbox split>
                  <FilterButton model={subcategory} className={classes.headerButton}/>
                  <div style={{ width: '15px' }}></div>
                  <SortButton variant="drawer" model={subcategory} className={classes.headerButton}/>
                </Hbox>
              </Hidden>
              
              <Hbox>
                <Typography variant="caption" className={classes.total}>{ subcategory.total } total items</Typography>
                <Hidden xsDown implementation="css">
                  <SortButton variant="menu" model={subcategory} className={classes.headerButton}  style={{ marginLeft: '10px'}}/>
                </Hidden>
              </Hbox>

              <ResponsiveTiles>
                { subcategory.items.map((product, i) => (
                  <ProductItem index={i} key={i} product={product}/> 
                ))}
              </ResponsiveTiles>

              <ShowMore key={subcategory.page} model={subcategory} infiniteScroll/>
            </Vbox>
          </Hbox>
        </Container>
      </Fragment>
    )
  
  }

}
