import crypto from 'crypto'
import querystring from 'querystring'
import { CLOUDFRONT_CACHE_HASH, XDN_VERSION } from 'react-storefront/router/headers'
import router from "../../src/routes";

const SURROGATE_KEY_NAME='__moov_sk__'

export const handler = (event, context, callback) => {

  console.log('Edge handler');

  const isAtEdge = !!event.Records
  const version = process.env.MOOV_XDN_VERSION || __build_timestamp__ // eslint-disable-line
  const request = isAtEdge ? event.Records[0].cf.request : event
  
  const query = request.querystring ? querystring.parse(request.querystring) : request.query

  // TODO: Clean up what is passed to Router
  const cacheKey = router.getCacheKey({
    path: request.uri,
    headers: request.headers,
    query
  }, {
    path: request.uri || request.path,
    query: querystring.stringify(query),
    // TODO: Need production properties here
  })

  // Inject after user transforms it
  cacheKey.version = version
  
  function setHeader(request, name, value) {
    request.headers[name] = isAtEdge
      ? [
          {
            key: name,
            value
          }
        ]
      : value
  }

  console.log('Raw Key', cacheKey);

  const sortedKeys = Object.keys(cacheKey).sort()
  const sortedContent = sortedKeys.map(key => `${key}=${cacheKey[key]}`).join('|')
  const keyHash = crypto.createHash('sha256').update(sortedContent).digest('base64');

  console.log('Cache Hash', keyHash);
  
  setHeader(request, CLOUDFRONT_CACHE_HASH + '-debug', JSON.stringify(cacheKey))
  setHeader(request, CLOUDFRONT_CACHE_HASH, keyHash)
  setHeader(request, XDN_VERSION, version)
  setHeader(request, 'x-moov-edge-event', JSON.stringify(event))

  const surrogateKey = router.getSurrogateKey(request)
  console.log('surrogateKey', surrogateKey);
  
  if (surrogateKey) {
    request.querystring = querystring.stringify({...query, [SURROGATE_KEY_NAME]: surrogateKey})
    console.log('querystring', request.querystring);
  }

  // Prefix the version
  console.log('VERSION', version);
  
  if (request.origin) {
    request.origin.custom.path = `/${version}`
    if (process.env.API_GATEWAY_DOMAIN) {
      request.origin.custom.domainName = process.env.API_GATEWAY_DOMAIN
    }
    console.log(request.origin.custom);
  }

  callback(null, request)
};
