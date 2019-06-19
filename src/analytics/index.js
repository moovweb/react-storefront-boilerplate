/* 
Here you can configure analytics using react-storefront-extensions, which is a commercial module 
provided by Moovweb.  An example is provided below:
*/

// import DebugTarget from 'react-storefront-extensions/DebugTarget'

// export default () => [
//   new DebugTarget().sendForAllEvents()
// )

import GoogleAnalyticsAPITarget from 'react-storefront-extensions/GoogleAnalyticsAPITarget'
import GoogleAnalyticsTarget from 'react-storefront-extensions/GoogleAnalyticsTarget'

export default () => [
  new GoogleAnalyticsAPITarget({
    trackingID: 'UA-26739163-21',
    customDimensions: [typeof window !== 'undefined' ? window.location.href : null]
  }),
  new GoogleAnalyticsTarget({ trackingID: 'UA-26739163-21' })
]
