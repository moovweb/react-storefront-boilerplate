import React from 'react'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'
import AppModel from '../src/AppModel'
import theme from '../src/theme'
import { MuiThemeProvider } from '@material-ui/core'

export default function TestProvider({ app, history, children, ...stores }) {
  if (app == null || !app.applyState) {
    app = AppModel.create({
      location: {
        pathname: '/',
        search: '',
        hostname: 'localhost'
      },
      ...app
    })
  }

  const initialEntries = []

  if (app.location) {
    initialEntries.push(app.location.pathname + app.location.search)
  }

  history = history || createMemoryHistory({ initialEntries })

  return (
    <Provider 
      router={{}} 
      app={app}
      history={history}
      {...stores}
    >
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </Provider>
  )
}