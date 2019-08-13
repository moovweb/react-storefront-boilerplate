const edge = require('react-storefront/webpack/edge')
const path = require('path')

module.exports = edge(path.join(__dirname, '..', '..'), {
  router: 'src/routes.js'
})
