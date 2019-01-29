import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

const pageSize = 10

const facetGroups = [
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
]

const matchesByCode = {}

for (let group of facetGroups) {
  for (let facet of group.facets) {
    matchesByCode[facet.code] = facet.matches
  }
}

export default function subcategoryHandler({ c='0', id='0', filters, sort = 'rating', page, format }, request, response) {
  page = page == null ? null : parseInt(page)

  if (page != null && format === 'json') {
    // handle pagination and filtering
    return createProducts(filters, page, { categoryId: c, subcategoryId: id }) 
  } else {
    // handle initial landing
    return withGlobalState(request, globalState, { 
      title: `React Storefront - Subcategory #${id}`,
      page: 'Subcategory',
      breadcrumbs: [
        { text: 'Home', url: '/' },
        { text: `Category ${c}`, url: `/c/${c}`, state: { loadingCategory: { id: c, name: `Category ${c}` }} },
        { text: `Subcategory ${id}` }
      ],
      subcategory: {
        id, 
        name: `Subcategory ${id}`,
        description: `This is the description for subcategory ${id}.`,
        total: 50,
        filters, 
        sort,
        facetGroups,
        sortOptions: [
          { name: 'Price - Low to High', code: 'price_asc' },
          { name: 'Price - High to Low', code: 'price_desc' },
          { name: 'Most Popular', code: 'pop' },
          { name: 'Highest Rated', code: 'rating' }
        ],
        ...createProducts([], 0, { categoryId: c, subcategoryId: id })
      }
    })
  }
} 

/**
 * Creates mock products for the subcategory view.  You can remove this function in a real app.
 * @param {String[]} filters An array of filter codes
 * @param {Integer} page The page number
 * @param {Object} options
 * @param {Object} options.categoryId The parent category's id
 * @param {Object} options.subcategoryId The subcategory's id
 */
function createProducts(filters=[], page=0, { categoryId, subcategoryId }) {
  const items = []

  const total = filters.length === 0 ? 50 : filters
    .map(filter => matchesByCode[filter])
    .reduce((total, matches) => matches ? matches + total : total, 0)

  const count = Math.min(total, pageSize)

  for (let i=1; i<=count; i++) {
    const id = (page * count) + i
    items.push({ 
      id: id.toString(), 
      url: `/p/${id}?c=${encodeURIComponent(categoryId)}&s=${encodeURIComponent(subcategoryId)}`,
      name: `Product ${id}`, 
      basePrice: 99.99, 
      rating: i%5, 
      thumbnail: `http://via.placeholder.com/256x256?text=${encodeURIComponent(`Product ${id}`)}` 
    })
  }

  return { items, total }
}