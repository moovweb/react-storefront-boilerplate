import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function cartHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    
  })
}