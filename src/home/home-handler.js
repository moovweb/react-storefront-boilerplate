import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function homeHandler(params, request) {
	return withGlobalState(request, globalState, { 
    title: "React Storefront",
    welcomeMessage: "From Shopify Land!"
  })
} 
