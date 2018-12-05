const { dev } = require('react-storefront/webpack/server')
const path = require('path')

module.exports = dev(
  path.join(__dirname, '..', '..'),
  // Adds the eslint loader to webpack.
  // You can use the default Moovweb eslint style guide by running
  // ```
  // npm install eslint-config-moov
  // npm install eslint-plugin-react-storefront
  // ```
  //
  // {
  //   eslintConfig: {
  //     extends: 'plugin:react-storefront/recommended',
  //     plugins: [
  //       'react-storefront',
  //     ],
  //     env: {
  //       'react-storefront/server': true,
  //     },
  //   }
  // }
);
