import { productSearch, categorySearch } from 'react-storefront-extensions/shopify'

export default async function suggestHandler({ q }) {
  return categorySearch(q).then(categoryResults => {
    return productSearch(q).then(productResults => {
      return {
        search: {
          text: q,
          groups: [
            {
              caption: 'Suggested Categories',
              results: categoryResults
            },
            {
              caption: 'Suggested Products',
              results: productResults
            }
          ]
        }
      };
    });
  });
}