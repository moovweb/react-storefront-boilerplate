// Creates an express server to host the app in development when running via npm run start:express
// You can delete this file if you use moovsdk to run your app (npm start)

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import theme from './theme'
import model from './AppModel'
import App from './App'
import router from './routes'
import Server from 'react-storefront/Server'
import reactStorefrontMiddleware from 'react-storefront-middleware'
import paths from '../config/paths'
import chalk from 'chalk'
import path from 'path'

const app = express()

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))
}

app.use(cors())
app.use(bodyParser.json())

app.use(
  reactStorefrontMiddleware(
    new Server({ 
      theme, 
      model, 
      App, 
      router
    }) 
  )
)

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
  )
})

export default app