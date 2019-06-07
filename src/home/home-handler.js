import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

const welcomeMessages = {
  'en': "Welcome to your new React Storefront app.  Here you'll find mock home, category, subcategory, product, and cart pages that you can use as a starting point to build your PWA.<br/><br/>Happy coding!",
  'ee': 'Tere tulemast rakendusse React Storefront. Siit leiad koduse, kategooria, alamkategooria, toote ja ostukorvi leheküljed, mida saate kasutada PWA ehitamiseks lähtepunktina. Õnnelik kodeerimine!'
}

export default function homeHandler(params, request, response) {
  return withGlobalState(request, globalState, { 
    title: "React Storefront",
    welcomeMessage: welcomeMessages[request.cookies['language']] || welcomeMessages['en']
  })
} 
