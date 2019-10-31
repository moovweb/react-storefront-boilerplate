import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import CmsSlot from 'react-storefront/CmsSlot'
import withAmp from 'react-storefront-extensions/amp/withAmp'

@inject('app')
@withAmp
@observer
export default class Home extends Component {
  render() {
    const { app } = this.props

    return (
      <Container>
        <Row>
          <Typography variant="h4">React Storefront</Typography>
        </Row>
        <Row>
          <Typography variant="subtitle1">
            <picture>
              <source
                srcSet="https://cdn-staging.thetiebar.com/heros/homepage_hero_october.jpg"
                media="(min-width: 601px)"
              />
              <img
                style={{ width: '100%' }}
                src="https://cdn-staging.thetiebar.com/heros/homepage_hero_october.jpg?w=414&amp;h=292"
                alt="Shop Sweaters"
              />
            </picture>
          </Typography>
        </Row>
      </Container>
    )
  }
}
