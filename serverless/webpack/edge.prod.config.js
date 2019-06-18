const path = require("path");
const root = path.join(__dirname, "..", "..");
const createConfig = require("react-storefront/webpack/edge").prod(root, {
  envVariables: {
    'process.env.MOOV_XDN_VERSION': JSON.stringify(process.env.MOOV_XDN_VERSION),
    'process.env.API_GATEWAY_DOMAIN': JSON.stringify(process.env.API_GATEWAY_DOMAIN)
  }
});

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
