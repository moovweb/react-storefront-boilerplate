import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, { 
    title: "React Storefront",
    welcomeMessage: "Welcome to your new React Storefront app.  Here you'll find mock home, category, subcategory, product, and cart pages that you can use as a starting point to build your PWA.<br/><br/>Happy coding!"
  })
} 
