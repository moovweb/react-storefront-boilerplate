/**
 * Called whenever an error is throw, including:
 *
 * React rendering on the client and server
 * Route handlers on the server client and server
 * All unhandled rejections on the client
 * All uncaught errors on the client
 *
 * @param {Object} event
 * @param {Error} event.error The error that was thrown.
 * @param {AppModel} options.app The current app state.  This may be null in some cases if the error prevented a state from being computed
 * @param {History} options.history The JS history object.  You can use this to get the current location.
 */
export default function errorReporter({ error, app, history }) {
  // TODO: report errors to the error logging service of your choice here.
  console.error(error)
}
