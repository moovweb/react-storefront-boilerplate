import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import { Skeleton, BlankRow, Row, Space, Content, Tiles } from 'react-storefront/Skeleton'
import ActionButton from 'react-storefront/ActionButton'
import Typography from '@material-ui/core/Typography'

@withStyles(theme => ({
  productImage: {
    width: '100%',
    paddingTop: '100%'
  }
}))
@inject(({ app }) => ({ subcategory: app.loadingSubcategory, app }))
@observer
export default class SubcategorySkeleton extends Component {
  render() {
    let { subcategory, classes } = this.props

    if (!subcategory) subcategory = {}

    return (
      <Skeleton>
        <BlankRow height="20px"/>
        <Row>
          <Space/>
          <Content>
            <Typography variant="title" component="h1" className={classes.header}>{subcategory.name}</Typography>
          </Content>
          <Space flex="1"/>
        </Row>
        <BlankRow height="20px"/>
        <Row height="20px">
          <Space />
          <Content flex="1"/>
          <Space/>
        </Row>
        <BlankRow height="20px"/>
        <Row>
          <Space/>
          <Content flex="1" display="flex">
            <ActionButton label="Filter" style={{ flex: 1 }}/>
          </Content>
          <Space/>
          <Content flex="1" display="flex">
            <ActionButton label="Sort" style={{ flex: 1 }}/>
          </Content>
          <Space/>
        </Row>
        <BlankRow height="10px"/>
        <Row height="16px">
          <Space flex="1"/>
          <Content width="80px"/>
          <Space/>
        </Row>
        <BlankRow height="20px"/>
        <Row>
          <Tiles style={{ flex: 1 }}>
            { this.renderProducts() }
          </Tiles>
        </Row>
      </Skeleton>
    )
  }

  renderProducts() {
    const products = []
    const { classes } = this.props

    for (let i=0; i<6; i++) {
      products.push(<Product key={i} classes={classes}/>)
    }

    return products
  }
}

const Product = ({ classes, key }) => (
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