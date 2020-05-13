/* 
Here you can configure analytics using react-storefront-extensions, which is a commercial module 
provided by Moovweb.  An example is provided below:
*/

// import DebugTarget from 'react-storefront-extensions/DebugTarget'

// export default () => [
//   new DebugTarget().sendForAllEvents()
// )

import { GATarget, trackingID } from './GoogleAnalytics'

export default () => {
  if (typeof window !== 'undefined' && window.location.search.match(/_analytics=0/)) {
    return []
  } else {
    return [new GATarget({ trackingID }).sendForAllEvents()]
  }
}
