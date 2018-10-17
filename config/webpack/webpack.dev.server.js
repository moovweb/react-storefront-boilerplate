const { dev } = require('react-storefront/webpack/server')
const path = require('path')

module.exports = dev(path.join(__dirname, '..', '..'))