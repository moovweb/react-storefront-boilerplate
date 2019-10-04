import { getOptimizedSrc } from 'react-storefront/Image'

export default function({ color, id }, req, res) {
  const contrast = color === 'cccccc' ? '' : '/fff'
  const text = encodeURIComponent('Product ' + id)
  const src = `https://via.placeholder.com/200/${color}${contrast}?text=${text}`
  res.redirect(src)
}
