import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function categoryHandler({ id }, request, response) {
  return withGlobalState(request, globalState, { 
    title: `React Storefront - Category #${id}`,
    page: 'Category',
    breadcrumbs: [
      { text: 'Home', url: '/' },
      { text: `Category ${id}` }
    ],
    category: {
      id, 
      name: `Category ${id}`,
      description: `Description for category ${id}`,
      subcategories: [
        { id: '1', name: 'Subcategory 1', image: 'http://via.placeholder.com/350x175?i=1', url: '/s/1' },
        { id: '2', name: 'Subcategory 2', image: 'http://via.placeholder.com/350x175?i=2', url: '/s/2' },
        { id: '3', name: 'Subcategory 3', image: 'http://via.placeholder.com/350x175?i=3', url: '/s/3' },
        { id: '4', name: 'Subcategory 4', image: 'http://via.placeholder.com/350x175?i=4', url: '/s/4' },
        { id: '5', name: 'Subcategory 5', image: 'http://via.placeholder.com/350x175?i=5', url: '/s/5' },
        { id: '6', name: 'Subcategory 6', image: 'http://via.placeholder.com/350x175?i=6', url: '/s/6' },
        { id: '7', name: 'Subcategory 7', image: 'http://via.placeholder.com/350x175?i=7', url: '/s/7' },
        { id: '8', name: 'Subcategory 8', image: 'http://via.placeholder.com/350x175?i=8', url: '/s/8' },
        { id: '9', name: 'Subcategory 9', image: 'http://via.placeholder.com/350x175?i=9', url: '/s/9' },
        { id: '10', name: 'Subcategory 10', image: 'http://via.placeholder.com/350x175?i=10', url: '/s/10' }
      ]
    }
  })
} 
 