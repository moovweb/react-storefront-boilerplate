export default () => ({
  menu: {
    levels: [{
      root: true,
      items: [{
        text: "Category 1",
        items: [{
          text: "Subcategory 1",
          url: "/s/1",
          state: JSON.stringify({
            loadingSubcategory: {
              id: "loading-1",
              name: 'Subcategory 1'
            }
          })
        }, {
          text: "Subcategory 2",
          url: "/s/2",
          state: JSON.stringify({
            loadingSubcategory: {
              id: "loading-2",
              name: 'Subcategory 2'
            }
          })
        }]
      }, {
        text: "Category 2",
        items: [{
          text: "Subcategory 1",
          url: "/s/1",
          state: JSON.stringify({
            loadingSubcategory: {
              id: "loading-1",
              name: 'Subcategory 1'
            }
          })
        }, {
          text: "Subcategory 2",
          url: "/s/2",
          state: JSON.stringify({
            loadingSubcategory: {
              id: "loading-2",
              name: 'Subcategory 2'
            }
          })
        }]
      }]
    }]
  },
  tabs: {
    items: [
      { text: 'Category 1', url: '/c/1', prefetch: 'visible' },
      { text: 'Category 2', url: '/c/2', prefetch: 'visible' },
      { text: 'Category 3', url: '/c/3', prefetch: 'visible' },
      { text: 'Category 4', url: '/c/4', prefetch: 'visible' },
      { text: 'Category 5', url: '/c/5', prefetch: 'visible' },
      { text: 'Category 6', url: '/c/6', prefetch: 'visible' },
      { text: 'Category 7', url: '/c/7', prefetch: 'visible' },
      { text: 'Category 8', url: '/c/8', prefetch: 'visible' },
      { text: 'Category 9', url: '/c/9', prefetch: 'visible' },
      { text: 'Category 10', url: '/c/10', prefetch: 'visible' }
    ].map(item => ({ ...item, state: JSON.stringify({ loadingCategory: { name: item.text, id: item.text }})}))
  }
})