import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Container from 'react-storefront/Container'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import CmsSlot from 'react-storefront/CmsSlot'
import withAmp from 'react-storefront/amp/withAmp'
import Link from 'react-storefront/Link'

@withAmp
@inject('app')
export default class Home extends Component { 

  render() {
    const { app } = this.props

    return (
      <Container> 
        <Row>
          <Typography variant="display1">React Storefront</Typography>
        </Row>
        <Row>
          <Typography variant="subheading">
            <CmsSlot>{ app.welcomeMessage }</CmsSlot>
          </Typography>
        </Row>
        <Row>
          <Typography>Want to reuse your PWA header and menu in adapt pages?  <Link server to="/financial">Here's an example</Link>.</Typography>
        </Row>
      </Container> 
    )
  }

}
