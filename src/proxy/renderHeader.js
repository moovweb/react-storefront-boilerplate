import React from 'react'
import Header from '../header/Header'
import { render } from 'react-storefront/renderers'
import AppModel from '../AppModel'
import theme from '../theme'

/**
 * Inserts the PWA header into adapt pages.
 * @param {Object} stats Webpack build stats object for the client build
 */
export default function renderHeader(stats) {
  const { html } = render({
    component: <Header/>,
    state: createState(),
    theme,
    stats,
    clientChunk: 'header' // the name of the entry injected into config/web.dev.*.js
  })

  // remove the existing header
  $body.find('header').remove()

  // add the new header and supporting resources to the document
  const $header = $(tag('div', { class: 'mw-header' })).append(html)
  $body.find('#page-container').attr('id', null).prepend($header)
}

/**
 * Extracts a menu item from a nav menu element on www.moovweb.com.  The logic here is 
 * specific to www.moovweb.com and only serves an example of extracting MenuModel data from
 * the upstream site.
 * @return {AppModel}
 */
function createState() {
  function extractMenuItem() {
    const el = $(this)
    const link = el.children('a')
    const href = link.attr('href')
    const children = el.find('.sub-menu > .menu-item').map(extractMenuItem).get()
  
    return {
      text: link.text(),
      url: children.length ? null : href,
      items: children.length ? children : null
    }
  }

  return AppModel.create({ 
    menu:{
      levels: [{
        root: true,
        items: $body.find('#top-menu > .menu-item').map(extractMenuItem).get()
      }]
    }
  })
}