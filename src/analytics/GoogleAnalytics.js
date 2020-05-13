import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Helmet from 'react-helmet'
import GoogleAnalyticsTarget from 'react-storefront-extensions/GoogleAnalyticsTarget'

export const trackingID = 'UA-26739163-21'

/**
 * Overrides the default GoogleAnalyticsTarget implementation to disable injecting the GA script in the
 * head and suppress the first pageview event.  These will be handled by the GoogleAnalytics
 * react component below.
 */
export class GATarget extends GoogleAnalyticsTarget {
  scripts = []
  initialPageViewSent = false

  injectCodeInHead() {
    // stub out this method because we're going to use helmet to inject the script
  }

  sendPageViewEvent(...args) {
    if (!this.initialPageViewSent) {
      // skip sending the first page view event since we'll be injecting into the script rendered on the server
      this.initialPageViewSent = true
      return
    } else {
      // send all subsequent pageview events
      super.sendPageViewEvent(...args)
    }
  }
}

@inject(({ app, analytics }) => ({ app, analytics }))
export class GoogleAnalytics extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { app } = this.props
    const useAmpClientId = true

    // GoogleAnalyticsTarget already handles amp correctly
    if (app.amp) {
      return null
    }

    // Recreate the code from GoogleAnalyticsTarget that injects the ga script into the head on mount
    // Here we render the ga script on the server so that it run as soon as the browser parses the page.
    return (
      <Helmet>
        <script>
          {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          
          ga('create', '${trackingID}', 'auto', { useAmpClientId: ${useAmpClientId.toString()} });
          ga('send', 'pageview')
        `}
        </script>
      </Helmet>
    )
  }
}
