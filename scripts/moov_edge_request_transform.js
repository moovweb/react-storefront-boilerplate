const edgeRequestTransform = require('react-storefront/platform/edgeRequestTransform').default

/**
 * This function runs at the edge before the cache.
 * Here we support custom server cache keys via server.key in cache route handlers.
 * @param {Object} options
 * @param {Function} options.setCacheKey A function to register a callback to set a cache key for the current request.
 */
module.exports = ({ setCacheKey }) => {
  edgeRequestTransform({
    setCacheKey,
    router: require('../src/routes').default
  })
};