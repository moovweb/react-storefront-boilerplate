import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, withWidth } from '@material-ui/core'
import { Skeleton, BlankRow, Row, Space, Content, Tiles } from 'react-storefront/Skeleton'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import Container from 'react-storefront/Container'

const cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }

@withStyles(theme => ({
  image: {
    width: '100%',
    paddingTop: '50%'
  }
}))
@withWidth()
@inject(({ app }) => ({ category: app.loadingCategory, app }))
@observer
export default class CategorySkeleton extends Component {
  render() {
    let { category, classes } = this.props

    if (!category) category = {}

    return (
      <div>
        <Breadcrumbs items={[{ text: 'Home', url: '/' }, { text: category.name }]}/>
        <Container>
          <Skeleton>
            <BlankRow/>
            <Row>
              <Content>
                <Typography variant="h6" component="h1" className={classes.header}>{category.name}</Typography>
              </Content>
              <Space flex="1"/>
            </Row>
            <BlankRow height="20px"/>
            <Row height="20px">
              <Content flex="1"/>
            </Row>
            <BlankRow height="20px"/>
            <Row>
              <Tiles style={{ flex: 1 }} cols={cols}>
                { this.renderSubcategories() }
              </Tiles>
            </Row>
          </Skeleton>
        </Container>
      </div>
    )
  }

  renderSubcategories() {
    const subcategories = []
    const { classes, width } = this.props
    const count = cols[width] * 3

    for (let i=0; i<count; i++) {
      subcategories.push(<Subcategory key={i} classes={classes}/>)
    }

    return subcategories
  }

}

const Subcategory = ({ classes }) => (
  <div style={{ flex: 1 }}>
    <Content className={classes.image}/>
    <BlankRow height="10px"/>
    <Content height="24px"/>
    <BlankRow height="30px"/>
  </div>
)