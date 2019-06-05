import crypto from 'crypto'
import { CLOUDFRONT_CACHE_HASH, XDN_VERSION } from 'react-storefront/router/headers'
import router from "../../src/routes";

const SURROGATE_KEY_NAME='__moov_sk__'

export const handler = (event, context, callback) => {

  const isAtEdge = !!event.Records
  const version = __build_timestamp__ // eslint-disable-line
  const request = isAtEdge ? event.Records[0].cf.request : event

  const protocol = request.origin ?
    request.origin.protocol :
    request.requestContext ? request.requestContext.protocol : ''

  const accept = (request.headers.accept && Array.isArray(request.headers.accept)) ? request.headers.accept[0].value : request.headers.Accept

  const key = router.getCacheKey({
    path: request.uri || request.path,
    method: request.method,
    query: request.querystring
  }, {
    path: request.uri || request.path
    // protocol,
    // accept
  })
  
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


  console.log('Raw Key', key);

  const keyHash = crypto.createHash('sha256').update(JSON.stringify(key)).digest('base64');
  
  setHeader(request, CLOUDFRONT_CACHE_HASH, keyHash)
  setHeader(request, XDN_VERSION, version)

  const surrogateKey = router.getSurrogateKey(request)
  console.log('surrogateKey', surrogateKey);
  if (surrogateKey) {
    // if (!request.queryStringParameters) {
    //   request.queryStringParameters = {}
    // }  
    // request.queryStringParameters[SURROGATE_KEY_NAME] = surrogateKey
    request.querystring = `${request.querystring}${request.querystring ? '&' : ''}${SURROGATE_KEY_NAME}=${surrogateKey}`
  }

  callback(null, request)
};
