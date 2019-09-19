export default function imagesHandler({ id, color }) {
  const images = [
    `https://via.placeholder.com/600x600/${color}/fff?text=${encodeURIComponent(
      'Product Image 1'
    )}`,
    `https://via.placeholder.com/600x350/${color}/fff?text=${encodeURIComponent(
      'Product Image 2'
    )}`,
    `https://via.placeholder.com/350x600/${color}/fff?text=${encodeURIComponent(
      'Product Image 3'
    )}`,
    {
      src: 'https://temp.media/video/?height=400&width=500&length=10',
      video: true
    }
  ]

  const thumbnails = [
    `https://via.placeholder.com/600x600/${color}/fff?text=${encodeURIComponent(
      'Product Image 1'
    )}`,
    `https://via.placeholder.com/600x350/${color}/fff?text=${encodeURIComponent(
      'Product Image 2'
    )}`,
    `https://via.placeholder.com/350x600/${color}/fff?text=${encodeURIComponent(
      'Product Image 3'
    )}`,
    'https://placehold.it/500x400'
  ]

  return {
    images,
    thumbnails,
    thumbnail: thumbnails[0],
    selectedImage: 0
  }
}
