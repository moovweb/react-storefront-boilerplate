import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import CmsSlot from 'react-storefront/CmsSlot'

@inject('app')
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
            <CmsSlot>{app.welcomeMessage}</CmsSlot>
          </Typography>
        </Row>
      </Container>
    )
  }
}
