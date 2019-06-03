const path = require("path");
const root = path.join(__dirname, "..", "..");
const createConfig = require("react-storefront/webpack/edge").prod(root);

module.exports = createConfig({
  entry: {
    edge: path.join(__dirname, "..", "src", "edge.js")
  },
  plugins: [],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
    libraryTarget: "umd"
  },
  target: "node",
  resolve: {
    alias: {
      "/build/stats.json": path.join(__dirname, '..', '..', 'scripts', 'build', 'stats.json')
    }
  }
});
