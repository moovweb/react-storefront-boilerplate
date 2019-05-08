import globalState from '../globalState'
import { withGlobalState } from 'react-storefront/router'

/**
 * This handler returns only the data needed for global state, such as the
 * main menu and navigation tabs, so that the UI can prefetch and cache
 * an app shell for offline support.
 * @param {*} params
 * @param {*} request
 * @param {*} response
 */
export default function appShellHandler(params, request, response) {
  return withGlobalState(request, globalState, {
    loading: true
  })
}
