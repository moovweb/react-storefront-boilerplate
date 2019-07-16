console.error = console.warn = console.log

const start = new Date().getTime()

const index = require('react-storefront-moov-xdn').default
const errorReporter = require('../src/errorReporter').default

module.exports = async function() {
  await index({
    theme: require('../src/theme').default,
    model: require('../src/AppModel').default,
    App: require('../src/App').default,
    router: require('../src/routes').default,
    blob: env.blob || require('../src/blob.dev'),
    errorReporter
  })

  const end = new Date().getTime()

  console.log('RSF took ' + (end - start) + 'ms to serve ' + env.path)
}
