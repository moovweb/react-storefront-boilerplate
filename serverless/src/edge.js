import { CLOUDFRONT_CACHE, XDN_VERSION } from 'react-storefront/router/headers'
import router from "../../src/routes";


const SURROGATE_KEY_NAME='__moov_sk__'

export const handler = (event, context, callback) => {

  const isAtEdge = !!event.Records
  const version = __build_timestamp__ // eslint-disable-line
  const request = isAtEdge ? event.Records[0].cf.request : event

  const key = router.getCacheKey(request, {
    path: request.path,
    version
  })
  
  const surrogateKey = router.getSurrogateKey(request)

  console.log('surrogateKey', surrogateKey);

  function setHeader(request, key, value) {
    request.headers[key] = isAtEdge
      ? [
          {
            key,
            value
          }
        ]
      : value
  }


  console.log('Raw Key', key);

  const encodedKey = encodeURIComponent(JSON.stringify(key))
  
  setHeader(request, CLOUDFRONT_CACHE, encodedKey)
  setHeader(request, XDN_VERSION, version)

  if (!request.queryStringParameters) {
    request.queryStringParameters = {}
  }
  request.queryStringParameters[SURROGATE_KEY_NAME] = surrogateKey

  callback(null, request)
};
