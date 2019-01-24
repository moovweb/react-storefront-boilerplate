const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const paths = {
  clientBuild: resolveApp('build/assets'),
  serverBuild: resolveApp('build/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/express'),
  srcShared: resolveApp('src/shared'),
  publicPath: '/pwa/',
}

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  'node_modules',
]

module.exports = paths
