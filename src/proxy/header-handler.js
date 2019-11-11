import React from 'react'
import getStats from 'react-storefront-stats'
import globalState from '../globalState'
import Header from '../header/Header'
import { render } from 'react-storefront/renderers'
import AppModel from '../AppModel'
import theme from '../theme'

export default async function headerHandler(params, request) {
  const stats = await getStats()

  return render({
    component: <Header />,
    state: AppModel.create(globalState()),
    theme,
    stats,
    injectAssets: false,
    clientChunk: 'header' // the name of the entry injected into config/web.dev.*.js
  })
}
