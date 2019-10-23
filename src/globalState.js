/**
 * Creates mock menu entries.  You can remove this in a real app
 */
function createMenu() {
  const menu = {
    root: true,
    items: []
  }

  for (let c = 1; c <= 10; c++) {
    const text = `Category ${c}`

    const category = {
      text,
      prefetch: 'visible',
      url: `/c/${c}`,
      state: JSON.stringify({
        loadingCategory: { name: text, id: text },
        breadcrumbs: [{ url: '/', text: 'Home' }, { text: `Category ${c}` }]
      }),
      items: []
    }

    menu.items.push(category)

    for (let s = 1; s <= 10; s++) {
      const text = `Subcategory ${s}`

      category.items.push({
        text,
        url: `/s/${s}?c=${c}`,
        state: JSON.stringify({
          loadingSubcategory: { name: text, id: text },
          breadcrumbs: [
            { url: '/', text: 'Home' },
            { url: `/c/${c}`, text: `Category ${c}` },
            { text: `Subcategory ${s}` }
          ]
        }),
        items: Array(4).fill(0).map((e, i) => ({
          text: `Item ${s}/${i}`,
          url: `/s/${s}?c=${c}&i=${i}`,
        }))
      })
    }
  }

  return menu
}

/**
 * Returns data for the main Menu and NavTabs components
 */
export default () => {
  const menu = createMenu()

  return {
    menu: {
      levels: [menu]
    },
    tabs: menu,
    search: {
      initialGroups: [
        {
          caption: 'Suggested Searches',
          results: ['Red Dress', 'Blue Shoes', 'White Top'].map(text => ({
            text,
            url: `/search?q=${encodeURIComponent(text)}`
          }))
        },
        {
          caption: 'Suggested Categories',
          results: [
            { text: 'Category 1', url: '/c/1' },
            { text: 'Category 2', url: '/c/2' },
            { text: 'Category 3', url: '/c/3' }
          ]
        },
        {
          caption: 'Suggested Products',
          results: [
            {
              text: 'Product 1',
              url: '/p/1?s=1&c=1',
              thumbnail: 'https://via.placeholder.com/120x120'
            },
            {
              text: 'Product 2',
              url: '/p/2?s=1&c=1',
              thumbnail: 'https://via.placeholder.com/120x120'
            },
            {
              text: 'Product 3',
              url: '/p/3?s=1&c=1',
              thumbnail: 'https://via.placeholder.com/120x120'
            },
            {
              text: 'Product 4',
              url: '/p/4?s=1&c=1',
              thumbnail: 'https://via.placeholder.com/120x120'
            },
            {
              text: 'Product 5',
              url: '/p/5?s=1&c=1',
              thumbnail: 'https://via.placeholder.com/120x120'
            }
          ]
        }
      ]
    }
  }
}
