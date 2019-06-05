import renderHeader from './renderHeader'
import getStats from 'react-storefront-stats'
import request from 'request'
import config from '../../moov_config.json'

export default async function proxyHandler(params, req, response) {
  const contentType = env.content_type || '';
  if (contentType.indexOf('html') > -1) {
    // const stats = await getStats()
    // fns.init$(body)
    // renderHeader(stats) // reuse the PWA header in legacy pages
    // response.send($.html())

    request(`https://www.moovweb.com${req.url}`).pipe(response)
    
  } else {

    // TODO: Need to pull domain out of host map
    // TODO: Use the rewriter to transform the response
    
    request(`https://www.moovweb.com${req.url}`).pipe(response)

  }
}

