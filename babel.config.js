module.exports = function (api) {
  const modules = api.env().match(/client/) ? false : 'commonjs'

  return {
    "presets": [
      ["@babel/env", {
        "targets": {
          "browsers": "> 1%"
        },
        "useBuiltIns": "usage",
        "forceAllTransforms": true,
        "modules": modules
      }],
      "@babel/react"
    ],
    "env": {
      "development-server": {
        "plugins": ['react-storefront']
      },
      "production-server": {
        "plugins": ['react-storefront']
      }
    },
    "plugins": [
      ["@babel/plugin-transform-runtime", {
        "regenerator": true
      }],
      "@babel/plugin-transform-async-to-generator",
      ["@babel/plugin-proposal-decorators", {
        "legacy": true
      }],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      "universal-import"
    ]
  }
}
