import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

@inject('app')
export default class AmpUserState extends Component {
  static propTypes = {
    root: PropTypes.string
  }

  static defaultProps = {
    root: 'user',
    url: '/user.json'
  }

  render() {
    const { app, children, url, root, ampListProps } = this.props

    if (app.amp) {
      return (
        <>
          <Helmet>
            <script
              async
              custom-element="amp-list"
              src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
            />
            <script
              async
              custom-template="amp-mustache"
              src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
            />
          </Helmet>
          <amp-list
            src={url}
            layout="fill"
            items={root}
            credentials="include"
            single-item
            {...ampListProps}
          >
            <template type="amp-mustache" items=".">
              {children}
            </template>
          </amp-list>
        </>
      )
    } else {
      return children
    }
  }
}
