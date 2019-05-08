const edgeResponseTransform = require('react-storefront-moov-xdn/edgeResponseTransform').default

/**
 * This function runs at edge after the response has been returned from the cache.
 */
module.exports = function() {
  edgeResponseTransform()
  // Put your custom logic to transform the response post-cache here if needed.
};