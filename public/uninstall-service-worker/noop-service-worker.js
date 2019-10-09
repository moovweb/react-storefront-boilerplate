/*
 * This service worker immediately takes control away from  the existing service worker,
 * then uninstall itself.  Technically it will be running until the next page reload, but it
 * won't do anything.
 */

self.addEventListener('install', function(event) {
  self.skipWaiting()
  console.log('[react-storefront] no-op service worker installed')
})

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
  console.log('[react-storefront] no-op service worker has claimed all clients')

  self.registration.unregister().then(function() {
    console.log(
      '[react-storefront] no-op service worker will be removed the next time the page reloads'
    )
  })
})
