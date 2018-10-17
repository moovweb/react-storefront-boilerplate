import theme from './theme'
import model from './AppModel'
import App from './App'
import router from './routes'
import Server from 'react-storefront/Server'
import Config from 'react-storefront/Config'

export default function createServer({ globals, blob } = {}) {
  Config.load(blob || require('./blob.dev').default)

  return new Server({ 
    theme, 
    model, 
    App, 
    router,
    globals
  }) 
}