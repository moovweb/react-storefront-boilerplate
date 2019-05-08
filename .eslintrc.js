// Use the default moovweb eslint style guide by running
// `npm install eslint-config-moov; npm install eslint-plugin-react-storefront`,
// or use your own style guide.
//
module.exports = {
  extends: 'plugin:react-storefront/recommended',
  plugins: [
    'react-storefront',
  ],
  env: {
    'react-storefront/server': true
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
