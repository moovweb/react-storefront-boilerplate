// Creates an express server to host the app in development when running via npm run start:express
// You can delete this file if you use moovsdk to run your app (npm start)

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import theme from "../../src/theme";
import model from "../../src/AppModel";
import App from "../../src/App";
import router from "../../src/routes";
import Server from "react-storefront/Server";
import reactStorefrontMiddleware from "react-storefront-middleware";
import paths from "../../config/paths";
import path from "path";

const app = express();

const staticPaths = {
  [paths.publicPath]: paths.publicPath,
  "/icons": "/icons",
  "/manifest.json": "manifest.json",
  "/robots.txt": "robots.txt",
  "/service-worker.js": "service-worker.js",
}

for (let key in staticPaths) {
  app.use(key, express.static(path.join(paths.clientBuild, staticPaths[key])));
}

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const X_MOOV_XDN_VERSION_HEADER = 'x-moov-xdn-version'
  const X_MOOV_CACHE_HASH = 'x-moov-cache-hash'

  res.set(X_MOOV_XDN_VERSION_HEADER, req.get(X_MOOV_XDN_VERSION_HEADER))
  res.set(X_MOOV_CACHE_HASH, req.get(X_MOOV_CACHE_HASH))

  if (req.query.debug) {
    res.json({
      timestamp: (new Date()).toISOString(),
      originalUrl: req.originalUrl,
      method: req.method,
      headers: req.headers,
    })
  } else {
    next()
  }
})


app.use(
  reactStorefrontMiddleware(
    new Server({
      theme,
      model,
      App,
      router
    })
  )
);

// app.listen(process.env.PORT || 8500, () => {
//   console.log(
//     `[${new Date().toISOString()}]`,
//     chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
//   )
// })

export default app;
