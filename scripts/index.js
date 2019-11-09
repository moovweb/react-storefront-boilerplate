console.error = console.warn = console.log

module.exports = function() {
  require('../src/analytics')

  const index = require('react-storefront-moov-xdn').default
  const { transformAmpHtml } = require('react-storefront-extensions/amp')
  const errorReporter = require('../src/errorReporter').default

  index({
    theme: require('../src/theme').default,
    model: require('../src/AppModel').default,
    App: require('../src/App').default,
    router: require('../src/routes').default,
    blob: env.blob || require('../src/blob.dev'),
    transform: transformAmpHtml,
    errorReporter
  })
}
