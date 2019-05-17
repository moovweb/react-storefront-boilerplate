const { dev } = require('react-storefront/webpack/client')
const path = require('path')

module.exports = dev(path.join(__dirname, '..', '..'), {
  workboxConfig: require('./workbox.config'),
  allowPrefetchThrottling: true,
  entries: {
    header: './proxy/hydrateHeader'
  },
  externals: {
    'isomorphic-fetch': 'fetch',
    os: {
      commonjs: 'os',
      commonjs2: 'os'
    },
    process: 'process'
  }
  // Adds the eslint loader to webpack.
  // You can use the default Moovweb eslint style guide by running
  // `npm install eslint-config-moov`, or use your own style guide.
  //
  // eslintConfig: {
  //   extends: 'moov',
  // }
})
