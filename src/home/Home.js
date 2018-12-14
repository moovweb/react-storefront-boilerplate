import React, { Component } from 'react'
import Container from 'react-storefront/Container'
import Typography from '@material-ui/core/Typography'
import Row from 'react-storefront/Row'
import withAmp from 'react-storefront/amp/withAmp'

@withAmp
export default class Home extends Component { 
  render() {
    return (
      <Container> 
        <Row>
          <Typography variant="h4">Let's Shop!</Typography>
        </Row>
        <Row>
          <Typography variant="subtitle1">
            Welcome to the<br /> React Storefront Shopify Boilerplate
          </Typography>
        </Row>
      </Container> 
    )
  }

}
