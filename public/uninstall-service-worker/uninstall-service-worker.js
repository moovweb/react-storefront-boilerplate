/**
 * Registers a service worker that does nothing except immediately
 * take control of whatever service worker was previously installed.
 */
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
  navigator.serviceWorker.register('/noop-service-worker.js')
}
