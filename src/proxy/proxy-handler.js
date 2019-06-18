// import renderHeader from './renderHeader'
// import getStats from 'react-storefront-stats'
import { convertHostMapToSlugRoutingRules } from 'react-storefront/utils/moovConfig'
import request from 'request'
import url from 'url'
import config from '../../moov_config.json'
import PerfectProxyHeaderRewriter from './PerfectProxyHeaderRewriter'

const slugRoutingRules = convertHostMapToSlugRoutingRules(config.host_map)

const transformation = `
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
`

export default async function proxyHandler(params, req, response) {
  
  const { domain_model } = config;

  const options = {
    rewriteRequestHeaders: true, // domain_model === 'subdomain',
    rules: slugRoutingRules,
    secure: req.secure,
    // rewriteCookies: (CONFIG.Cookie_Rewrite_Mode === 'strict' && domain_model === 'single_domain') || domain_model === 'subdomain',
    host: req.host,
    sourceHost: env.source_host,
    cookieReplacement: env.cookie_domain_missing_replacement,
    cookieHost: domain_model === 'subdomain' ? env.source_host_no_port : env.host_no_port,
    catchAllEnabled: env.__catch_all_enabled__,
    catchAllDomain: env.__catch_all__
  }

  const rewriter = new PerfectProxyHeaderRewriter(req.headers, options);
  rewriter.rewriteRequestHeaders();
  const rewrittenHeaders = rewriter.headers
  
  // Don't allow compressed data
  delete rewrittenHeaders['accept-encoding']

  const requestOptions = {
    uri: url.format({
      protocol: req.protocol,
      host: rewrittenHeaders.host,
      pathname: req.path,
      query: req.query
    }),
    headers: rewrittenHeaders
  }

  request(requestOptions, (err, res, body) => {
    
    if (err) {
      return response.status(500).send(err.message)
    }

    // Transforming response headers
    const responseRewriter = new PerfectProxyHeaderRewriter(res.headers, options)
    responseRewriter.rewriteResponseHeaders()
    Object.keys(responseRewriter.headers).forEach(headerName => {
      response.set(headerName, responseRewriter.headers[headerName])
    })
    
    // USER CODE - TRANSFORMATION EXAMPLE
    if (res.request.path === '/faq' || res.request.path === '/company') {
      response.send(body + transformation);
      return
    }
      
    response.send(body);
  })

}

