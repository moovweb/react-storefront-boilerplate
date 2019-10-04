import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function productHandler({ id, c = '1', s = '1' }, request, response) {
  return withGlobalState(request, globalState, {
    title: `React Storefront - Product ${id}`,
    page: 'Product',
    breadcrumbs: [
      { text: 'Home', url: '/' },
      {
        text: `Category ${c}`,
        url: `/c/${c}`,
        state: { loadingCategory: { name: `Category ${c}` } }
      },
      {
        text: `Subcategory ${s}`,
        url: `/s/${s}?c=${c}`,
        state: { loadingSubcategory: { id: s, name: `Subcategory ${c}` } }
      },
      { text: `Product ${id}` }
    ],
    product: {
      id,
      url: request.path.replace(/\.json/, '') + request.search,
      name: `Product ${id}`,
      basePrice: 99.99,
      rating: id % 5,
      reviewCount: id * 10,
      description:
        'This is the product description. Vivamus accumsan non felis eu condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris sodales tincidunt mi vel lacinia. Cras ultricies magna eu viverra interdum. Sed dapibus lectus eu purus scelerisque cursus. Fusce faucibus feugiat elit sed posuere. Phasellus ac diam enim.',
      specs: `
      Nunc eu sem imperdiet, ultricies arcu nec, placerat libero. Nullam ut eros non est mattis hendrerit.
      <br>
      <ul>
        <li>In pretium commodo rhoncus.</li>
        <li>In convallis, dolor at eleifend rhoncus, ipsum neque bibendum est.</li>
        <li>Morbi condimentum magna mi, ac ullamcorper massa fermentum in.</li>
      </ul>
      In hac habitasse platea dictumst. Ut eget dolor nec erat dapibus egestas at nec nulla. In porta nibh ut felis condimentum, eu consequat lorem lobortis. Sed consectetur sodales blandit.
      `,
      reviews: [
        'Great product, would buy it again!',
        'Love it, gonna tell all my friends',
        'Keep up the good work, nailed it'
      ],
      size: {
        options: ['XS', 'S', 'M', 'L', 'XL'].map((option, i) => ({
          id: option,
          text: option,
          disabled: i === 4,
          price: i <= 2 ? 99.99 : 109.99
        }))
      },
      color: {
        options: [
          {
            text: 'Neutral Gray',
            id: 'cccccc',
            image: 'https://via.placeholder.com/350/cccccc/cccccc'
          },
          {
            text: 'Candy Apple Red',
            id: 'd32f2f',
            image: 'https://via.placeholder.com/350/d32f2f/d32f2f'
          },
          {
            text: 'Forest Green',
            id: '388E3C',
            image: 'https://via.placeholder.com/350/388E3C/388E3C'
          },
          {
            text: 'Azure Blue',
            id: '1565c0',
            image: 'https://via.placeholder.com/350/1565c0/1565c0',
            disabled: true
          }
        ],
        selected: {
          text: 'Neutral Gray',
          id: 'cccccc',
          image: 'https://via.placeholder.com/350/cccccc/cccccc'
        }
      },
      images: [
        {
          src: `https://via.placeholder.com/600x600/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - 1`
        },
        {
          src: `https://via.placeholder.com/600x350/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - 2`
        },
        {
          src: `https://via.placeholder.com/350x600/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - 3`
        },
        {
          src: 'https://pwa.moovweb.com/videos/500x400.mp4',
          video: true,
          alt: `Product ${id} - 4`
        }
      ],
      thumbnails: [
        {
          src: `https://via.placeholder.com/60x60/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - Thumbnail 1`
        },
        {
          src: `https://via.placeholder.com/60x35/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - Thumbnail 2`
        },
        {
          src: `https://via.placeholder.com/35x60/cccccc?text=${encodeURIComponent(
            `Product ${id}`
          )}`,
          alt: `Product ${id} - Thumbnail 3`
        },
        { src: 'https://placehold.it/500x400/cccccc/fff', alt: `Product ${id} - Thumbnail 4` }
      ]
    }
  })
}
