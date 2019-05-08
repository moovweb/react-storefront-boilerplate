// The main entry point when running the app via express (npm run start:express)
// You can delete this file if you use moovsdk to run your app (npm start)

const webpack = require('webpack')
const nodemon = require('nodemon')
const webpackConfig = require('../config/webpack/webpack.config')(process.env.NODE_ENV || 'development')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const paths = require('../config/paths')
const { logMessage, compilerPromise } = require('./utils')

const app = express()
const PORT = process.env.PORT || 8500
const WEBPACK_PORT = process.env.WEBPACK_PORT || Number(PORT) + 1

const start = async () => {
  const { createClientConfig, createServerConfig } = webpackConfig

  const clientConfig = createClientConfig({ url: `http://localhost:${PORT}` })

  const { serverBuild, srcServer } = paths;
  const serverConfig = createServerConfig({
    entry: srcServer,
    plugins: [], 
    output: {
      path: serverBuild
    },
    target: 'node', 
    resolve: {}
  })

  const multiCompiler = webpack([ clientConfig, serverConfig ])

  const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client')
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)

  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    stats: clientConfig.stats,
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })
  
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    })
  )

  app.listen(WEBPACK_PORT)

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats))
      return
    }

    if (error) {
      logMessage(error, 'error')
    }

    if (stats.hasErrors()) {
      const info = stats.toJson()
      const errors = info.errors[0].split('\n')
      logMessage(errors[0], 'error')
      logMessage(errors[1], 'error')
      logMessage(errors[2], 'error')
    }
  })

  // wait until client and server is compiled
  try {
    await serverPromise
    await clientPromise
  } catch (error) {
    logMessage(error, 'error')
  }

  const script = nodemon({
    script: `${paths.serverBuild}/main.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  })

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    console.log('Process ended')
    process.exit()
  })

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error')
    process.exit(1)
  })
}

start()