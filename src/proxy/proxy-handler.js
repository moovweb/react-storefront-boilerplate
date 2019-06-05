// import renderHeader from './renderHeader'
// import getStats from 'react-storefront-stats'
import { convertHostMapToSlugRoutingRules } from 'react-storefront/utils/moovConfig'
import request from 'request'
import config from '../../moov_config.json'
import cheerio from 'cheerio'

const slugRoutingRules = convertHostMapToSlugRoutingRules(config.host_map)

console.log('Slug Routing Rules', slugRoutingRules);

export default async function proxyHandler(params, req, response) {
  
  const rule = slugRoutingRules[1]
  
  // request transform using rules
  request(`${rule.Upstream}${req.url}`, (err, res, body) => {
    
    // USER CODE - TRANSFORMATION EXAMPLE
    let transformed = body

    if (res.request.path === '/faq') {
      const $ = cheerio.load(body)
      $('h1').css('color', '#e74c3c')
      transformed = $.html()
    }
    
    //// ------------------------ //////
      
    response.send(transformed);
  })

}

