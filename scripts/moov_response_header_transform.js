const responseHeaderTransform = require('react-storefront-moov-xdn/responseHeaderTransform').default
const { dedupeCookies } = require('react-storefront-extensions/cookies')

module.exports = function() {
  responseHeaderTransform()
  dedupeCookies()
}
