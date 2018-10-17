export default function imagesHandler({ id, color }) {
  const images = [
    `https://via.placeholder.com/400x400/${color}/fff`,
    `https://via.placeholder.com/400x350/${color}/fff`,
    `https://via.placeholder.com/350x400/${color}/fff`,
  ]

  return {
    images,
    thumbnails: images, 
    thumbnail: images[0]
  }
}