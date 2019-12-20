import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { render } from 'react-storefront/renderers'
import AppModel from '../AppModel'
import theme from '../theme'
import globalState from '../globalState'

/**
 * Inserts the PWA header and footer into adapt pages.
 * @param {Object} stats Webpack build stats object for the client build
 */
export default async function renderPWAComponents(stats) {
  // Here we create app state including the options for the main menu.
  // In a real site you'll likely need to derive this from the HTML returned from the upstream site.
  const state = AppModel.create(globalState())

  const renderOptions = {
    state,
    stats,
    theme,
    clientChunk: 'proxy' // the name of the entry injected into config/web.dev.*.js
  }

  return Promise.all([renderHeader(renderOptions), renderFooter(renderOptions)])
}

/**
 * Replace the legacy page's header with the PWA header
 */
async function renderHeader(options) {
  const { html } = await render({
    ...options,
    component: <Header />,
    cssPrefix: 'mwh'
  })

  // remove the existing header
  $body.find('header').remove()

  // add the new header and supporting resources to the document
  const $header = $(tag('div', { class: 'mw-header' })).append(html)

  $body.prepend($header)
}

/**
 * Append the PWA footer
 */
async function renderFooter(options) {
  const { html } = await render({
    ...options,
    component: <Footer />,
    cssPrefix: 'mwf'
  })

  // remove the existing header
  $body.find('footer').remove()

  // append the footer to the bottom of the page
  const $footer = $(tag('div', { class: 'mw-footer' })).append(html)

  $body.append($footer)
}
