import { authorize } from 'react-storefront-extensions/shopify'

export default function (params, request, response) {
	return authorize(request, response);
} 
