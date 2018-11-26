import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import { fetchSubcategories } from 'react-storefront-extensions/shopify'

export default function categoryHandler({ id }, request, response) {
  return fetchSubcategories(id).then(subcategories => withGlobalState(request, globalState, {
  	title: 'Shopify',
    page: 'Category',
    breadcrumbs: [
      { text: 'Home', url: '/' },
      { text: 'Shopify Collections' }
    ],
    category: {
      id: 'none', 
      name: 'Shopify Collections',
      description: 'All collections in Shopify Store',
      image: 'https://placehold.it/200',
      subcategories
    }
  }));
} 
