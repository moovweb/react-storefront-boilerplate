/*
This is the webpack client entry point for the header chunk that we'll inject into adapt pages.
See config/webpack/webpack.*.client.js
*/

import React from 'react'
import { hydrate } from 'react-storefront/renderers'
import Header from '../header/Header'
import model from '../AppModel'
import theme from '../theme'

hydrate({
  component: <Header/>,
  model,
  theme,
  target: document.querySelector('.mw-header')
})
