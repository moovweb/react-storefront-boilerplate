import addCacheKey from 'react-storefront/edge'
import router from "../../src/routes";

export const handler = (...args) => {
  addCacheKey(router, ...args)((match, params, request) => {

    console.log('match', match)
    console.log('params', params)
    console.log('req', request.queryStringParameters)

    const cacheKey = request.queryStringParameters && request.queryStringParameters.query

    return cacheKey
  })
};
