import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function productHandler({ id }, request, response) {
  return withGlobalState(request, globalState, { 
    title: `Product ${id}`,
    page: 'Product',
    product: {
      id,
      url: `/p/${id}`,
      name: `Product ${id}`,
      price: 99.99,
      rating: id % 5,
      reviewCount: id * 10,
      description: 'This is the product description. Vivamus accumsan non felis eu condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris sodales tincidunt mi vel lacinia. Cras ultricies magna eu viverra interdum. Sed dapibus lectus eu purus scelerisque cursus. Fusce faucibus feugiat elit sed posuere. Phasellus ac diam enim.',
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
        options: ['XS', 'S', 'M', 'L', 'XL'].map(option => ({ id: option, text: option })),
      },
      color: {
        options: [
          { text: 'Candy Apple Red', id: 'd32f2f', image: 'http://via.placeholder.com/350/d32f2f/d32f2f' },
          { text: 'Forest Green', id: '388E3C', image: 'http://via.placeholder.com/350/388E3C/388E3C' },
          { text: 'Azure Blue', id: '1565c0', image: 'http://via.placeholder.com/350/1565c0/1565c0' },
        ],
        selected: { text: 'Candy Apple Red', id: 'd32f2f', image: 'http://via.placeholder.com/350/d32f2f/d32f2f' }
      },
      images: [
        "http://via.placeholder.com/400x400/d32f2f/ffffff",
        "http://via.placeholder.com/400x350/d32f2f/ffffff",
        "http://via.placeholder.com/350x400/d32f2f/ffffff",
      ],
      thumbnails: [
        "http://via.placeholder.com/40x40/d32f2f/ffffff",
        "http://via.placeholder.com/40x35/d32f2f/ffffff",
        "http://via.placeholder.com/35x40/d32f2f/ffffff"
      ]
    }
  })
} 
