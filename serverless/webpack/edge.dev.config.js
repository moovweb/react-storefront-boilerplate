const webpack = require("webpack");
const path = require("path");
const root = path.join(__dirname, "..", "..")
const createConfig = require("react-storefront/webpack/edge").dev(root)

module.exports = createConfig({
  entry: {
    edge: path.join(__dirname, "..", "src", "edge.js")
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RSF_APP_ROOT': JSON.stringify(path.join(__dirname, "..", ".."))
    })
  ],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
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