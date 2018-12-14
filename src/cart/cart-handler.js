import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import { getCart } from 'react-storefront-extensions/shopify'

export default function cartHandler(params, request, response) {
	const match = request.headers.cookie.match(/sessionid=([\w\d=]+);/);
	if (!match) {
		return withGlobalState(request, globalState, {
  		cart: { items: [] }
  	});
	}
	return getCart(match[1]).then(items => {
		return withGlobalState(request, globalState, {
  		cart: { items }
  	});
  })
}