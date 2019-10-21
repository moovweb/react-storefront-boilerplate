const { dev } = require('react-storefront/webpack/client')
const path = require('path')

module.exports = dev(path.join(__dirname, '..', '..'), {
  workboxConfig: require('./workbox.config'),
  allowPrefetchThrottling: true
})
