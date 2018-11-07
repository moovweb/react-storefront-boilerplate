import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, Hidden, withWidth } from '@material-ui/core'
import { Skeleton, BlankRow, Row, Space, Content, Tiles } from 'react-storefront/Skeleton'
import ActionButton from 'react-storefront/ActionButton'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import Container from 'react-storefront/Container'
import { Hbox, Vbox } from 'react-storefront/Box'

const cols = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 5
}

@withStyles(theme => ({
  productImage: {
    width: '100%',
    paddingTop: '100%'
  },
  sidebar: {
    width: '230px',
    height: '100%'
  }
}))
@withWidth()
@inject(({ app }) => ({ subcategory: app.loadingSubcategory, app }))
@observer
export default class SubcategorySkeleton extends Component {
  render() {
    let { subcategory, classes } = this.props

    if (!subcategory) subcategory = {}

    return (
      <div>
        <Breadcrumbs/>
        <Container>
          <Skeleton>
            <Hbox alignItems="stretch">
              <Hidden xsDown implementation="css">
                <Vbox className={classes.sidebar}>
                  <BlankRow height="22px"/>
                  <Row>
                    <Content><Typography variant="subtitle1">Color</Typography></Content>
                    <Space flex="1"/>
                  </Row>
                  <FilterOption/>
                  <FilterOption/>
                  <FilterOption/>
                  <BlankRow height="31px"/>
                  <Row>
                    <Content><Typography variant="subtitle1">Size</Typography></Content>
                    <Space flex="1"/>
                  </Row>
                  <FilterOption/>
                  <FilterOption/>
                  <FilterOption/>
                  <Row flex="1">
                    <Space flex="1"/>
                  </Row>
                </Vbox>
              </Hidden>
              <Vbox flex="1">
                <BlankRow height="20px"/>
                <Row>
                  <Content>
                    <Typography variant="h6" component="h1" className={classes.header}>{subcategory.name}</Typography>
                  </Content>
                  <Space flex="1"/>
                </Row>
                <BlankRow height="20px"/>
                <Row height="20px">
                  <Content flex="1"/>
                </Row>
                <BlankRow height="20px"/>
                <Hidden smUp>
                  <Row>
                    <Content flex="1" display="flex">
                      <ActionButton label="Filter" style={{ flex: 1 }}/>
                    </Content>
                    <Space/>
                    <Content flex="1" display="flex">
                      <ActionButton label="Sort" style={{ flex: 1 }} value="Highest Rated"/>
                    </Content>
                  </Row>
                </Hidden>
                <Hidden smUp>
                  <BlankRow height="10px"/>
                  <Row height="16px">
                    <Space flex="1"/>
                    <Content width="80px"/>
                    <Space/>
                  </Row>
                </Hidden>
                <Hidden xsDown>
                  <Row>
                    <Space flex="1"/>
                    <ActionButton label="Sort" value="Highest Rated"/>
                  </Row>
                </Hidden>
                <BlankRow height="7.5px"/>
                <Row>
                  <Tiles style={{ flex: 1 }} cols={cols}>
                    { this.renderProducts() }
                  </Tiles>
                </Row>
              </Vbox>
            </Hbox>
          </Skeleton>
        </Container>
      </div>
    )
  }

  renderProducts() {
    const products = []
    const { classes, width } = this.props
    const count = cols[width] * 3

    for (let i=0; i<count; i++) {
      products.push(<Product key={i} classes={classes}/>)
    }

    return products
  }
}

const Product = ({ classes }) => (
  <div style={{ flex: 1 }}>
    <Content className={classes.productImage}/>
    <BlankRow height="10px"/>
    <Content height="16px"/>
    <BlankRow height="10px"/>
    <Content height="16px"/>
    <BlankRow height="10px"/>
    <Content height="16px"/>
    <BlankRow height="30px"/>
  </div>
)

const FilterOption = () => (
  <Fragment>
    <BlankRow height="30px"/>
    <Row height="16px"><Content flex="1"/><Space width="30px"/></Row>
  </Fragment>
)