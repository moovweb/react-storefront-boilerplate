import crypto from 'crypto'
import querystring from 'querystring'
import { CLOUDFRONT_CACHE_HASH, XDN_VERSION } from 'react-storefront/router/headers'
import router from "../../src/routes";

export const SURROGATE_KEY_NAME ='__moov_sk__'

const getRequest = (event, isAtEdge) => {
  let request = isAtEdge ? event.Records[0].cf.request : event
  if (isAtEdge) {
    request.path = request.uri
    request.query = querystring.parse(request.querystring)
  }

  return request
}

export const handler = (event, context, callback) => {
  const isAtEdge = !!event.Records
  const request = getRequest(event, isAtEdge)
  const query = request.query

  // TODO: Clean up what is passed to Router
  const cacheKey = router.getCacheKey({
    path: request.uri,
    headers: request.headers,
    query: request.query
  }, {
    path: request.uri || request.path,
    query: querystring.stringify(query),
    // TODO: Need production properties here
  })

  const version = process.env.MOOV_XDN_VERSION || __build_timestamp__ // eslint-disable-line
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
    const keys = Array.isArray(surrogateKey) ? surrogateKey : [surrogateKey]
    request.uri = `/${keys.map(k => `${SURROGATE_KEY_NAME}${k}`).join('/')}${request.uri}`
    console.log('request.uri', request.uri);
  }

  // Prefix the version
  console.log('VERSION', version);
  
  if (request.origin) {
    request.origin.custom.path = `/${version}`
    if (process.env.API_GATEWAY_DOMAIN) {
      request.origin.custom.domainName = process.env.API_GATEWAY_DOMAIN
    }
    console.log('request origin', request.origin.custom);
  }

  callback(null, request)
};
