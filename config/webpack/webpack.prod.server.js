const { prod } = require('react-storefront/webpack/server')
const path = require('path')

module.exports = prod(path.join(__dirname, '..', '..'))