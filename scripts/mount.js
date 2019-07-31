// This function (and the late bindings within) are necessary due to how
// control-flow.js in moovworker sets the state of `global` at different points
// during the execution of bundled code.
function getRequireMap(path) {
  switch (path) {
    // This is a misleading variable name. What it actually means is the
    // interface version for control-flow.js in moovworker. Previously, it was
    // coupled to the major version of moov_bundler. It should be kept separate
    // (as even major version changes to moov_bundler can maintain the
    // interface).
    case 'moov_config':
      return { version: '2' }
    case 'moov_stdlib':
      return require('moov_stdlib')
    case 'moov_rewriter':
      return require('moov_rewriter')
    case '/index.js':
      return require('./index.js')
    case '/moov_request_header_transform.js':
      return require('./moov_request_header_transform.js')
    case '/moov_response_header_transform.js':
      return require('./moov_response_header_transform.js')
    case '/moov_edge_request_transform.js':
      return require('./moov_edge_request_transform.js')
    case '/moov_edge_response_transform.js':
      return require('./moov_edge_response_transform.js')
  }
}

global.require = path => {
  const requestedModule = getRequireMap(path)

  if (!requestedModule) {
    throw new Error(`Module load failed for ${path}`)
  }

  return requestedModule
}
