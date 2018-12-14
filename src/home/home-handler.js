import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'
import { fetchMenu } from 'react-storefront-extensions/shopify'

export default function homeHandler(params, request) {
	return fetchMenu().then(menu => {
		return withGlobalState(request, globalState, { 
	    title: "React Storefront",
	    welcomeMessage: "From Shopify Land!",
	    menu
	  })
	});
} 
