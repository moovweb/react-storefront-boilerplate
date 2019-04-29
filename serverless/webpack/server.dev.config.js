const webpack = require("webpack");
const path = require("path");
const root = path.join(__dirname, "..", "..")
const createConfig = require("react-storefront/webpack/server").dev(root)

module.exports = createConfig({
  entry: [path.join(__dirname, "..", "src", "app.js")],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RSF_APP_ROOT': JSON.stringify(path.join(__dirname, "..", ".."))
    })
  ],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "app.js",
    libraryTarget: "umd"
  },
  alias: {
    'react-storefront-stats': path.join(
      root,
      'node_modules',
      'react-storefront',
      'stats',
      'getStatsFromFileSystem',
    )
  },
  target: "node"
});