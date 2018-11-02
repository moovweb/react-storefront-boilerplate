import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import SubcategoryLink from 'react-storefront/SubcategoryLink'
import Typography from '@material-ui/core/Typography'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import withAmp from 'react-storefront/amp/withAmp'
import Image from 'react-storefront/Image'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import Breadcrumbs from 'react-storefront/Breadcrumbs'

@withAmp
@withStyles(theme => ({
  subcategories: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '& li': {
      display: 'flex',
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.margins.row,
      flexDirection: 'column'
    }
  },
  subcategoryName: {
    textAlign: 'center',
    margin: `${theme.margins.container}px 0`,
  },
  link: {
    textDecoration: 'none'
  },
  image: {
    width: '100%'
  }
}), { name: 'RSFDemoCategory' })
@inject(({ app }) => ({ category: app.category }))
@observer
export default class App extends Component {
  render() {
    const { category, classes } = this.props

    if (!category) return null    

    return (
      <Fragment>
        <Breadcrumbs/>
        <Container>
          <Row>
            <Typography variant="h6" component="h1">{category.name}</Typography>
          </Row>
          <Row>
            <Typography variant="subtitle1" component="h2">{category.description}</Typography>
          </Row> 
          <Row>
            <ResponsiveTiles cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
              { category.subcategories.map((subcategory, i) => (
                <div key={subcategory.id}>
                  <SubcategoryLink prefetch="visible" className={classes.link} subcategory={subcategory}>
                    <Image lazy={i > 3} className={classes.image} aspectRatio={50} src={subcategory.image} alt={category.name}/>
                    <Typography className={classes.subcategoryName} variant="subtitle1">{subcategory.name}</Typography>
                  </SubcategoryLink>
                </div>
              ))}
            </ResponsiveTiles>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
