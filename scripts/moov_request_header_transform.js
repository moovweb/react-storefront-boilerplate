console.error = console.warn = console.log;

const requestHeaderTransform = require('react-storefront-moov-xdn/requestHeaderTransform').default;

module.exports = function() {
  requestHeaderTransform({
    router: require('../src/routes').default
  })
};
