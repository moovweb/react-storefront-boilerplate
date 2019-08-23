module.exports = function(api) {
  api.cache.never()

  return {
    sourceType: 'unambiguous',
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: '> 1%'
          },
          useBuiltIns: 'usage',
          forceAllTransforms: true,
          modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
          corejs: 2
        }
      ],
      '@babel/react'
    ],
    env: {
      'development-server': {
        plugins: ['react-storefront']
      },
      'production-server': {
        plugins: ['react-storefront']
      }
    },
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true
        }
      ],
      '@babel/plugin-transform-async-to-generator',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'universal-import'
    ]
  }
}
