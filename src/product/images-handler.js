export default function imagesHandler({ id, color }) {
  const text = encodeURIComponent(`Product ${id}`)
  const contrast = color === 'cccccc' ? '' : '/fff'

  const images = [
    {
      src: `https://via.placeholder.com/600x600/${color}${contrast}?text=${text}`,
      zoomSrc: `https://via.placeholder.com/1200x1200/${color}${contrast}?text=${text}`,
      zoomWidth: 1200,
      zoomHeight: 1200,
      alt: `${text} - 1`
    },
    {
      src: `https://via.placeholder.com/600x350/${color}${contrast}?text=${text}`,
      zoomSrc: `https://via.placeholder.com/1200x700/${color}${contrast}?text=${text}`,
      zoomWidth: 1200,
      zoomHeight: 700,
      alt: `${text} - 2`
    },
    {
      src: `https://via.placeholder.com/350x600/${color}${contrast}?text=${text}`,
      zoomSrc: `https://via.placeholder.com/700x1200/${color}${contrast}?text=${text}`,
      zoomWidth: 700,
      zoomHeight: 1200,
      alt: `${text} - 3`
    },
    {
      src: `https://via.placeholder.com/601x601/${color}${contrast}?text=${text}`,
      alt: `${text} - 4`
    },
    {
      src: 'https://pwa.moovweb.com/videos/500x400.mp4',
      poster: `https://via.placeholder.com/600x600/${color}${contrast}?text=${text}`,
      video: true,
      alt: `${text} - 5`
    }
  ]

  const thumbnails = [
    `https://via.placeholder.com/600x600/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/600x350/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/350x600/${color}${contrast}?text=${text}`,
    `https://via.placeholder.com/601x601/${color}${contrast}?text=${text}`,
    `https://placehold.it/500x400/${color}${contrast}`
  ]

  return {
    images,
    thumbnails,
    thumbnail: thumbnails[0],
    selectedImage: 0
  }
}
