import { Router, fromClient, fromServer, cache, proxyUpstream } from 'react-storefront/router'

const cacheHandler = cache({ server: { maxAgeSeconds: 300 }, client: true }) // cache responses in varnish for 5 minutes

export default new Router()
  .get('/', 
    cacheHandler,
    fromClient({ page: 'Home' }),
    fromServer('./home/home-handler')
  )
  .get('/session', fromServer('./checkout/session-handler'))
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
    cacheHandler,
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
  .post('/order',
    fromClient({ page: 'Confirmation' }),
    fromServer('./checkout/order-handler')
  )
  .get('/search/suggest',
    fromServer('./search/suggest-handler')
  )
  .get('/search',
    // Note: Search results and subcategory views are often the same.  In practice you may need to implement 
    // a different handler or view for search results.  For simplicity we just reuse the subcategory view and 
    // handler here.
    fromClient({ page: 'Subcategory' }),
    fromServer('./subcategory/subcategory-handler'),
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