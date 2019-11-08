module.exports = function() {
  const responseHeaderTransform = require('react-storefront-moov-xdn/responseHeaderTransform')
    .default
  const { dedupeCookies } = require('react-storefront-extensions/cookies')

  responseHeaderTransform()
  dedupeCookies()
}
