import router from "../../src/routes";
import { CLOUDFRONT_CACHE, XDN_VERSION } from 'react-storefront/router/headers'

function buildCacheKey(match, params) {
  if (!match) return null
  return params.id
}

export const handler = (event, context, callback) => {

  const request = event.Records ? event.Records[0].cf.request : event;
    
  const { match, params } = router.findMatchingRoute(request)
  console.log('match', match);
  console.log('params', params);

  request.headers[CLOUDFRONT_CACHE] = buildCacheKey(match, params)
  request.headers[XDN_VERSION] = __build_timestamp__ // eslint-disable-line

  callback(null, request)
};
