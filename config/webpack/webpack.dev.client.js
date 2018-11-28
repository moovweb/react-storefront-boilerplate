const { dev } = require('react-storefront/webpack/client')
const path = require('path')

module.exports = dev(path.join(__dirname, '..', '..'), {
  workboxConfig: require('./workbox.config'),
  entries: {
    header: './proxy/hydrateHeader'
  },
  // Adds the eslint loader to webpack.
  // You can use the default Moovweb eslint style guide by running
  // `npm install eslint-config-moov`, or use your own style guide.
  //
  // eslintConfig: {
  //   extends: 'moov',
  // }
});
