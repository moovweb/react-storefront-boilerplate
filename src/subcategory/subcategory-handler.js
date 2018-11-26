import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import { fetchProducts, fetchSubcategory } from 'react-storefront-extensions/shopify'

export default function subcategoryHandler({ c='0', id='0' }, request, response) {
  return fetchSubcategory(id).then(subcategory => {
    return fetchProducts(id).then(items => {
      return withGlobalState(request, globalState, { 
        title: subcategory.name,
        page: 'Subcategory',
        breadcrumbs: [
          { text: 'Home', url: '/' },
          { text: `Shopify Collections`, url: `/c/0` },
          { text: subcategory.name }
        ],
        subcategory: {
          ...subcategory,
          numberOfPages: 1,          
          items
        }
      })
    });
  });
}
