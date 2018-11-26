import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

import { fetchProduct } from 'react-storefront-extensions/shopify'

export default function productHandler({ id, c, s }, request, response) {
  return fetchProduct(id).then(product => {
    return withGlobalState(request, globalState, { 
      title: product.name,
      page: 'Product',
      breadcrumbs: [
        { text: 'Home', url: '/' },
        { text: `Shopify Collections`, url: `/c/0` },
        { text: `Subcategory ${s}`, url: `/s/${s}?c=${c}` },
        { text: product.name },
      ],
      product
    });
  }); 
}
