import App from './App'
import theme from './theme'
import model from './AppModel'
import router from './routes'
import launchClient from 'react-storefront/launchClient'
import errorReporter from './errorReporter'

const launch = () => {
  launchClient({
    App,
    router,
    theme,
    model,
    errorReporter
  })
}

if (document.readyState === 'complete') {
  launch()
} else {
  window.addEventListener('load', launch)
}
