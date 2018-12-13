import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

import { fetchProduct } from 'react-storefront-extensions/shopify'

export default function productHandler({ id, c, s }, request, response) {
  const breadcrumbs = [
    { text: 'Home', url: '/' }
  ];
  if (c) {
    breadcrumbs.push({ text: `Shopify Collections`, url: `/c/${c}` });
  }
  if (s) {
    breadcrumbs.push({ text: `Subcategory ${s}`, url: `/s/${s}?c=${c}` });
  }
  return fetchProduct(id).then(product => {
    breadcrumbs.push({ text: product.name });
    return withGlobalState(request, globalState, { 
      title: product.name,
      page: 'Product',
      breadcrumbs,
      product
    });
  }); 
}
