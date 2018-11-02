/**
 * Creates mock menu entries.  You can remove this in a real app
 */
function createMenu() {
  const menu = {
    root: true,
    items: []
  }

  for (let c=1; c<=10; c++) {
    const text = `Category ${c}`

    const category = {
      text,
      prefetch: 'visible',
      url: `/c/${c}`,
      state: JSON.stringify({ 
        loadingCategory: { name: text, id: text },
        breadcrumbs: [
          { url: '/', text: 'Home' },
          { text: `Category ${c}` }
        ]
      }),
      items: []
    }

    menu.items.push(category)

    for (let s=1; s<=10; s++) {
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
        })
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
    tabs: menu
  }
}
