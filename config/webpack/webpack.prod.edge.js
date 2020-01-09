const edge = require('react-storefront-edge/webpack')
const path = require('path')

module.exports = edge(path.join(__dirname, '..', '..'), {
  router: 'src/routes.js'
})
