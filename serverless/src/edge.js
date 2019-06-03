import addCacheKey from 'react-storefront/edge'
import router from "../../src/routes";

export const handler = (...args) => {
  addCacheKey(router, ...args)((match, params) => {

    console.log('match', match)
    console.log('params', params)

    if (!match) return null
    return params.id
  })
};
