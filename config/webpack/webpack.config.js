module.exports = function({ env, url }) {
  env = env === 'production' ? 'prod' : 'dev'

  return {
    createClientConfig: require(`./webpack.${env}.client`),
    createServerConfig: require(`./webpack.${env}.server`)
  }
}
