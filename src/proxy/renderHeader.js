import React from 'react'
import Header from '../header/Header'
import { render } from 'react-storefront/renderers'
import AppModel from '../AppModel'
import theme from '../theme'
import globalState from '../globalState'

/**
 * Inserts the PWA header into adapt pages.
 * @param {Object} stats Webpack build stats object for the client build
 */
export default async function renderHeader(stats) {
  // Here we create app state including the options for the main menu.
  // In a real site you'll likely need to derive this from the HTML returned from the upstream site.
  const state = AppModel.create(globalState())

  const { html } = await render({
    component: <Header />,
    state,
    theme,
    stats,
    clientChunk: 'header' // the name of the entry injected into config/web.dev.*.js
  })

  // remove the existing header
  $body.find('header').remove()

  // add the new header and supporting resources to the document
  const $header = $(tag('div', { class: 'mw-header' })).append(html)

  $body.prepend($header)
}
