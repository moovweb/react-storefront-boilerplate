const path = require("path");
const root = path.join(__dirname, "..", "..");
const createConfig = require("react-storefront/webpack/server").prod(root);

module.exports = createConfig({
  entry: [path.join(__dirname, "..", "src", "app.js")],
  plugins: [],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "app.js",
    libraryTarget: "umd"
  },
  target: "node",
  resolve: {
    alias: {
      "/build/stats.json": path.join(__dirname, '..', '..', 'scripts', 'build', 'stats.json')
    }
  }
});
