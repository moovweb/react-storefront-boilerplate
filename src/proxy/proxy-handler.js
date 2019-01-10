import renderHeader from './renderHeader'
import getStats from 'react-storefront-stats'

export default async function proxyHandler(params, request, response) {
  const contentType = env.content_type || '';
  if (contentType.indexOf('html') > -1) {
    const stats = await getStats()
    fns.init$(body)
    renderHeader(stats) // reuse the PWA header in legacy pages
    response.send($.html())
  } else {
    sendResponse({ htmlparsed: false });
  }
}

