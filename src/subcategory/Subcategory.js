import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import { Hbox } from 'react-storefront/Box'
import { withStyles } from '@material-ui/core'
import ProductItem from './ProductItem'
import FilterButton from 'react-storefront/FilterButton'
import SortButton from 'react-storefront/SortButton'
import withAmp from 'react-storefront/amp/withAmp'
import ShowMore from 'react-storefront/ShowMore'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'

@withStyles(theme => ({
  header: {
    margin: '20px 0'
  },
  description: {
    margin: '20px 0'
  },
  headerButton: {
    flex: 1
  },
  total: {
    margin: '10px 0',
    textAlign: 'right'
  }
}), { name: 'RSFSubcategory' })
@withAmp
@inject(({ app }) => ({ subcategory: app.subcategory, app }))
@observer
export default class Subcategory extends Component { 

  render() {
    const { classes, subcategory, app } = this.props

    if (!subcategory) return null

    return (
      <Container className={classes.root} key={subcategory.id}>
        <Typography variant="title" component="h1" className={classes.header}>{subcategory.name}</Typography>
        <Typography variant="body1" className={classes.description}>{subcategory.description}</Typography>

        <Hbox className={classes.actions} split>
          <FilterButton model={subcategory} className={classes.headerButton}/>
          <div style={{ width: '15px' }}></div>
          <SortButton model={subcategory} className={classes.headerButton}/>
        </Hbox>
        
        <Typography variant="caption" className={classes.total}>{ subcategory.total } total items</Typography>

        <ResponsiveTiles>
          { subcategory.items.map((product, i) => (
            <ProductItem index={i} key={i} product={product}/> 
          ))}
        </ResponsiveTiles>

        <ShowMore model={subcategory} infiniteScroll={app.page === 'Subcategory'}/>
      </Container>
    )
  
  }

}
