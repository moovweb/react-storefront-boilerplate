const path = require("path");
const root = path.join(__dirname, "..", "..");
const createConfig = require("react-storefront/webpack/server").prod(root);

module.exports = createConfig({
  entry: {
    app: path.join(__dirname, "..", "src", "app.js"),
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
