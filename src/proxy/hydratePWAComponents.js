/*
This is the webpack client entry point for the header chunk that we'll inject into adapt pages.
See config/webpack/webpack.*.client.js
*/

import React from 'react'
import hydrate from 'react-storefront/utils/hydrate'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import model from '../AppModel'
import theme from '../theme'

window.addEventListener('load', () => {
  hydrate({
    component: <Header />,
    model,
    theme,
    target: document.querySelector('.mw-header'),
    cssPrefix: 'mwh'
  })
  hydrate({
    component: <Footer />,
    model,
    theme,
    target: document.querySelector('.mw-footer'),
    cssPrefix: 'mwf'
  })
})
