/**
 * An example implementation of the API for the SearchPopup component using placeholder data.
 * @param {Object} params
 * @param {String} params.q The search text
 * @return {Object} An object whose shape matches AppModelBase
 */
export default async function suggestHandler({ q }) {
  return {
    search: {
      text: q,
      groups: [{
        caption: 'Suggested Searches',
        results: [`Small ${q}`, `Large ${q}`, `${q} with red stripes`].map(text => ({
          text,
          url: `/search?q=${encodeURIComponent(text)}` 
        }))
      }, {
        caption: 'Suggested Categories',
        results: [
          { text: 'Category 1', url: '/c/1' },
          { text: 'Category 2', url: '/c/2' },
          { text: 'Category 3', url: '/c/3' }
        ]
      }, {
        caption: 'Suggested Products',
        results: [
          { text: 'Product 1', url: '/p/1', thumbnail: "https://via.placeholder.com/120x120" },
          { text: 'Product 2', url: '/p/2', thumbnail: "https://via.placeholder.com/120x120" },
          { text: 'Product 3', url: '/p/3', thumbnail: "https://via.placeholder.com/120x120" }
        ]
      }]
    }
  }
}