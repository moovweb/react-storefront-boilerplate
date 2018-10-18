import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import { Skeleton, BlankRow, Row, Space, Content, Tiles } from 'react-storefront/Skeleton'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from 'react-storefront/Breadcrumbs'

@withStyles(theme => ({
  image: {
    width: '100%',
    paddingTop: '50%'
  }
}))
@inject(({ app }) => ({ category: app.loadingCategory, app }))
@observer
export default class CategorySkeleton extends Component {
  render() {
    let { category, classes } = this.props

    if (!category) category = {}

    return (
      <Skeleton>
        <Row height="40px">
          <Content>
            <Breadcrumbs items={[{ text: 'Home', url: '/' }, { text: category.name }]}/>
          </Content>
        </Row>
        <BlankRow/>
        <Row>
          <Space/>
          <Content>
            <Typography variant="title" component="h1" className={classes.header}>{category.name}</Typography>
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
          <Tiles style={{ flex: 1 }} cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
            { this.renderSubcategories() }
          </Tiles>
        </Row>
      </Skeleton>
    )
  }

  renderSubcategories() {
    const subcategories = []
    const { classes } = this.props

    for (let i=0; i<6; i++) {
      subcategories.push(<Subcategory key={i} classes={classes}/>)
    }

    return subcategories
  }
}

const Subcategory = ({ classes, key }) => (
  <div style={{ flex: 1 }}>
    <Content className={classes.image}/>
    <BlankRow height="10px"/>
    <Content height="24px"/>
    <BlankRow height="30px"/>
  </div>
)