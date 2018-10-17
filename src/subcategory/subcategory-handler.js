import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

const pageSize = 10

export default function subcategoryHandler({ id='0', filters, sort, page=0, format }, request, response) {
  page = parseInt(page)
  
  if (page && format === 'json') {
    // handle click on "Show More"
    return { items: createProducts(pageSize, parseInt(page) * pageSize) }
  } else {
    // handle initial landing
    return withGlobalState(request, globalState, { 
      title: `React Storefront - Subcategory #${id}`,
      page: 'Subcategory',
      subcategory: {
        id, 
        name: `Subcategory ${id}`,
        description: `This is the description for subcategory ${id}.`,
        total: 50,
        filters, 
        sort,
        facetGroups: [
          { name: 'Color', facets: [
            { name: 'Red', code: 'red', matches: 24 },
            { name: 'Green', code: 'green', matches: 10 },
            { name: 'Blue', code: 'blue', matches: 34 }
          ]},
          { name: 'Size', facets: [
            { name: 'Small', code: 'sm', matches: 20 },
            { name: 'Medium', code: 'md', matches: 30 },
            { name: 'Large', code: 'lg', matches: 50 },
            { name: 'X-Large', code: 'xl', matches: 9 }
          ]}
        ],
        sortOptions: [
          { name: 'Price - Low to High', code: 'price_asc' },
          { name: 'Price - High to Low', code: 'price_desc' },
          { name: 'Most Popular', code: 'pop' },
          { name: 'Highest Rated', code: 'rating' }
        ],
        items: createProducts((page + 1) * pageSize)
      }
    })
  }
} 

function createProducts(count, start=0) {
  const items = []

  for (let i=1; i<=count; i++) {
    const id = start + i
    items.push({ 
      id: id.toString(), 
      url: `/p/${id}`,
      name: `Product ${id}`, 
      price: 99.99, 
      rating: i%5, 
      thumbnail: `http://via.placeholder.com/128x128?index=${id}` 
    })
  }

  return items
}