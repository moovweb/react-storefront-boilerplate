import { fetchProductImages } from 'react-storefront-extensions/shopify'

export default async function imagesHandler({ id, color }) {
  return fetchProductImages(id, color);
}