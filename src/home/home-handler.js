import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import { createProducts } from '../subcategory/subcategory-handler';

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: 'React Storefront',
    // TODO: @defudef: This will be modified since we'll have app connected to the API
    subcategory: {
      id: '1',
      name: `Subcategory 1`,
      description: `This is the description for subcategory 1.`,
      total: 6,
      filters: [],
      sort: 'rating',
      facetGroups: [],
      sortOptions: [
        { name: 'Price - Low to High', code: 'price_asc' },
        { name: 'Price - High to Low', code: 'price_desc' },
        { name: 'Most Popular', code: 'pop' },
        { name: 'Highest Rated', code: 'rating' }
      ],
      ...createProducts()
    }
  })
}
