import crypto from 'crypto'
import { CLOUDFRONT_CACHE_HASH, XDN_VERSION } from 'react-storefront/router/headers'
import router from "../../src/routes";

export const handler = (event, context, callback) => {

  const isAtEdge = !!event.Records
  const version = process.env.MOOV_XDN_VERSION || __build_timestamp__ // eslint-disable-line
  const request = isAtEdge ? event.Records[0].cf.request : event

  const key = router.getCacheKey(request, {
    path: request.path,
    protocol: request.requestContext.protocol,
    accept: request.headers.Accept
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

  const keyHash = crypto.createHash('sha256').update(JSON.stringify(key)).digest('base64');
  
  setHeader(request, CLOUDFRONT_CACHE_HASH, keyHash)
  setHeader(request, XDN_VERSION, version)

  callback(null, request)
};
