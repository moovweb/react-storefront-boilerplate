// import renderHeader from './renderHeader'
// import getStats from 'react-storefront-stats'
import { convertHostMapToSlugRoutingRules } from 'react-storefront/utils/moovConfig'
import request from 'request'
import config from '../../moov_config.json'
import cheerio from 'cheerio'

const slugRoutingRules = convertHostMapToSlugRoutingRules(config.host_map)

console.log('Slug Routing Rules', slugRoutingRules);

function transformedHeaders() {

}

export default async function proxyHandler(params, req, response) {
  
  const rule = slugRoutingRules[1]
  
  // request transform using rules
  const url = `${rule.Upstream}${req.url}`
  const options = {
    headers: transformedHeaders(req, slugRoutingRules)
  }
  request(url, options, (err, res, body) => {
    
    // USER CODE - TRANSFORMATION EXAMPLE
    let transformed = body

    if (res.request.path === '/faq' || res.request.path === '/company') {
      const $ = cheerio.load(body)
      $('head').append(`
      <style>
      body:before {
        display: block;
        content: 'This page has been transformed';
        background: #2ecc71;
        width: 100%;
        color: white;
        font-size: 24px;
        font-weight: bold;
        font-family: monospace;
        padding: 10px;
        text-align: center;
      }
      </style>
      `)
      transformed = $.html()
    }
    
    //// ------------------------ //////
      
    response.send(transformed);
  })

}

