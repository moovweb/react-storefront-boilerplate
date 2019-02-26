/**
 * Handler for the PDP AMP form in src/product/Product.js
 * @param {Object} productInfo 
 */
export default function addFromAmp(params, request, response) {
  const { id, name, quantity } = request.body
  console.log(`Adding product id=${id}, name=${name}, quantity=${quantity}`)

  // Here you would make the necessary API call to add the product to the cart
  // And then redirect to the PWA's cart page
  return response.redirect('/cart')
}