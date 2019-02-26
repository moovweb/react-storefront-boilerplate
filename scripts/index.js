console.error = console.warn = console.log;

const index = require('react-storefront-moov-xdn').default
const { transformAmpHtml } = require('react-storefront-extensions/amp')

require('../src/analytics')

module.exports = function() {
  index({
    theme: require('../src/theme').default,
    model: require('../src/AppModel').default,
    App: require('../src/App').default,
    router: require('../src/routes').default,
    blob: env.blob || require('../src/blob.dev'),
    transform: transformAmpHtml
  })
}
