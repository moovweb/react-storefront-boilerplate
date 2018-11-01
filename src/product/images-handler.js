export default function imagesHandler({ id, color }) {
  const images = [
    `https://via.placeholder.com/600x600/${color}/fff?text=${encodeURIComponent('Product Image 1')}`,
    `https://via.placeholder.com/600x350/${color}/fff?text=${encodeURIComponent('Product Image 2')}`,
    `https://via.placeholder.com/350x600/${color}/fff?text=${encodeURIComponent('Product Image 3')}`,
  ]

  return {
    images,
    thumbnails: images, 
    thumbnail: images[0]
  }
}