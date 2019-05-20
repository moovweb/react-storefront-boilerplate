const responseHeaderTransform = require('react-storefront-moov-xdn/responseHeaderTransform').default
const { rewriteCookies } = require('react-storefront-extensions/cookies')

module.exports = function() {
  responseHeaderTransform()
  rewriteCookies()
}
