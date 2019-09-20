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
      src: 'https://pwa.moovweb.com/videos/500x400.mp4',
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
    `https://placehold.it/500x400/${color}/fff`
  ]

  return {
    images,
    thumbnails,
    thumbnail: thumbnails[0],
    selectedImage: 0
  }
}
