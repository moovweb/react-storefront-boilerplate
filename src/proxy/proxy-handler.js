// import renderHeader from './renderHeader'
// import getStats from 'react-storefront-stats'
import { convertHostMapToSlugRoutingRules } from 'react-storefront/utils/moovConfig'
import request from 'request'
import config from '../../moov_config.json'

const slugRoutingRules = convertHostMapToSlugRoutingRules(config.host_map)

console.log('Slug Routing Rules', slugRoutingRules);

export default async function proxyHandler(params, req, response) {
  const contentType = env.content_type || '';
  if (contentType.indexOf('html') > -1) {
    // const stats = await getStats()
    // fns.init$(body)
    // renderHeader(stats) // reuse the PWA header in legacy pages
    // response.send($.html())

    const rule = slugRoutingRules[1]

    // request transform using rules
    request(`${rule.Upstream}${req.url}`, {
      // headers: []
    })
    // transform the response
    .pipe(response)
    

  } else {

    // TODO: Need to pull domain out of host map
    // TODO: Use the rewriter to transform the response
    
    request(`https://www.moovweb.com${req.url}`).pipe(response)

  }
}

