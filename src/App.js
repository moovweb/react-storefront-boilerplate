import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from './header/Header'
import NavTabs from 'react-storefront/NavTabs'
import Pages from 'react-storefront/Pages'
import SearchDrawer from 'react-storefront/SearchDrawer'
import Helmet from 'react-helmet'
import CategorySkeleton from './category/CategorySkeleton'
import SubcategorySkeleton from './subcategory/SubcategorySkeleton'
import ProductSkeleton from './product/ProductSkeleton'
import AnalyticsProvider from 'react-storefront/AnalyticsProvider'
import TrackPageViews from 'react-storefront-extensions/TrackPageViews'
import Offline from 'react-storefront/Offline'
import fid from '!raw-loader!first-input-delay' // eslint-disable-line import/no-webpack-loader-syntax
import FirebasePerformanceMonitoring from 'react-storefront-extensions/FirebasePerformanceMonitoring'
import targets from './analytics'

@withStyles(theme => ({
  '@global': {
    body: {
      margin: '0',
      padding: '0',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize
    },
    a: {
      textDecoration: 'underline'
    }
  }
}))
export default class App extends Component {
  render() {
    return (
      <AnalyticsProvider targets={targets} delayUntilInteractive>
        <TrackPageViews>
          <div>
            <Helmet>
              {/**
               * This tag allows us to start the connection with the Moovweb
               * Optimization server as soon as the browser parses the HTML.
               *
               * Preconnect allows the browser to setup early connections
               * before an HTTP request is actually sent to the server.
               *
               * In turn, image optimization requests will be faster.
               *
               * If your project does not use this optimization service, this
               * tag can be removed.
               */}
              <link href="https://opt.moovweb.net" rel="preconnect" crossorigin />
              <link rel="shortcut icon" href="/icons/favicon.ico" />
              <meta
                name="description"
                content="Build and deploy sub-second e-commerce progressive web apps in record time."
              />
            </Helmet>
            <FirebasePerformanceMonitoring
              firstInputDelayPolyfill={fid}
              config={{
                apiKey: 'AIzaSyBaWW0RxrM5_UdVNwmbYJyjKmRL9mnIhBc',
                authDomain: 'react-storefront-docs.firebaseapp.com',
                databaseURL: 'https://react-storefront-docs.firebaseio.com',
                projectId: 'react-storefront-docs',
                storageBucket: 'react-storefront-docs.appspot.com',
                messagingSenderId: '33647407204',
                appId: '1:33647407204:web:d6e49ffdf25c8bce'
              }}
            />
            <Header />
            <NavTabs />
            <Pages
              loadMasks={{
                Category: CategorySkeleton,
                Subcategory: SubcategorySkeleton,
                Product: ProductSkeleton
              }}
              components={universal => ({
                Home: universal(import('./home/Home')),
                Category: universal(import('./category/Category')),
                Subcategory: universal(import('./subcategory/Subcategory')),
                Product: universal(import('./product/Product')),
                Cart: universal(import('./cart/Cart')),
                Checkout: universal(import('./checkout/Checkout')),
                Error: universal(import('./ErrorPage')),
                Offline
              })}
            />
            <SearchDrawer />
          </div>
        </TrackPageViews>
      </AnalyticsProvider>
    )
  }
}
