module.exports = function() {
  console.error = console.warn = console.log
  const requestHeaderTransform = require('react-storefront-moov-xdn/requestHeaderTransform').default
  requestHeaderTransform({
    router: require('../src/routes').default
  })
}
