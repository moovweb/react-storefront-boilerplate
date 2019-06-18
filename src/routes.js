import { Router, fromClient, fromServer, cache, proxyUpstream } from 'react-storefront/router'
import cookie from 'cookie'

const splitCacheByLanguage = cache({
  server: {
    maxAgeSeconds: 99999,
    key: (request, defaults) => {
      try {
        const cookieHeader = request.headers['cookie']
        const cookieValue = (cookieHeader && cookieHeader[0].value) || ''
        const language = cookie.parse(cookieValue).language
        return { ...defaults, language }
      } catch (e) {
        return { ...defaults, error: { message: e.message, stack: e.stack } }
      }
    }
  }
})

// See guide to caching on Moov XDN: https://pwa.moovweb.com/guides/caching
const cacheHandler = cache({
  server: {
    maxAgeSeconds: 300
  },
  client: true
}) // cache responses in varnish for 5 minutes

// See guide to routing: https://pwa.moovweb.com/guides/routing
export default new Router()
  // URL normalization
  .get('/normalize', 
    cache({
      server: {
        maxAgeSeconds: 99999,
        key: (request, { path, query }) => {
          const { uid, ...others } = request.query
          return { path, query: others }
        }
      }
    }),
    fromServer('./poc/normalize')
  )
  .get('/language',    
    splitCacheByLanguage, 
    fromServer('./poc/language')
  )
  // Cache split by language cookie

  .get('/',
    splitCacheByLanguage,
    fromClient({ page: 'Home' }),
    fromServer('./home/home-handler')
  )
  .get('/c/:id',
    cacheHandler,
    fromClient({ page: 'Category' }),
    fromServer('./category/category-handler')
  )
  .get('/s/:id',
    cacheHandler,
    fromClient({ page: 'Subcategory' }),
    fromServer('./subcategory/subcategory-handler')
  )
  .get('/p/:id',
    cache({
      server: {
        maxAgeSeconds: 300,
        surrogateKey: () => ['red', 'dress']
      },
      client: true
    }),
    fromClient({ page: 'Product' }),
    fromServer('./product/product-handler')
  )
  // This API method is automatically called and state is updated when the product model's color
  // is changed. Refer to `product/images-handler.js` to see an example implementation of the handler.
  .get('/p/:id/images/:color',
    cacheHandler,
    fromServer('./product/images-handler')
  )
  .get('/cart',
    fromClient({ page: 'Cart' }),
    fromServer('./cart/cart-handler')
  )
  .get('/cart/add-from-amp.json',
    fromServer('./cart/add-from-amp-handler')
  )
  .get('/checkout',
    fromClient({ page: 'Checkout' }),
    fromServer('./checkout/checkout-handler')
  )
  .get('/search/suggest',
    fromServer('./search/suggest-handler')
  )
  .get('/search',
    // Note: Search results and subcategory views are often the same.  In practice you may need to implement 
    // a different handler or view for search results.  For simplicity we just reuse the subcategory view and 
    // handler here.
    fromClient({ page: 'Subcategory' }),
    fromServer('./subcategory/subcategory-handler')
  )
  .error((e, params, request, response) => {
    response.status(500)

    return {
      page: 'Error',
      error: e.message,
      loading: false,
      stack: e.stack
    }
  })
  .fallback(
    // when no route matches, pull in content from the upstream site
    proxyUpstream('./proxy/proxy-handler')
  )