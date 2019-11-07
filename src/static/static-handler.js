import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

export default function staticHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    title: 'React Storefront',
  })
}
