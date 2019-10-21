export default function imagesHandler({ id, color }) {
  const text = encodeURIComponent(`Product ${id}`)
  const contrast = color === 'cccccc' ? '' : '/fff'

  const images = [
    `https://via.placeholder.com/600x600/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/600x350/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/350x600/${color}${contrast}?text=${text}`,
    {
      src: 'https://pwa.moovweb.com/videos/500x400.mp4',
      video: true
    }
  ]

  const thumbnails = [
    `https://via.placeholder.com/600x600/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/600x350/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/350x600/${color}${contrast}?text=${text}`,
    `https://placehold.it/500x400/${color}${contrast}`
  ]

  return {
    images,
    thumbnails,
    thumbnail: thumbnails[0],
    selectedImage: 0
  }
}
