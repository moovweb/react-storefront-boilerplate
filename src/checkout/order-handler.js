import { submitOrder } from 'react-storefront-extensions/shopify'

export default function orderHandler(params, request, response) {
	const match = request.headers.cookie.match(/sessionid=([\w\d=]+);/);
	return submitOrder(match[1], 'richard.vanderdys@moovweb.com').then(() => {
  	return { success: true };
	})
} 
