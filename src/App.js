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
import targets from './analytics'
import Offline from 'react-storefront/Offline'
import fid from '!raw-loader!first-input-delay' // eslint-disable-line import/no-webpack-loader-syntax
import FirebasePerformanceMonitoring from 'react-storefront-extensions/FirebasePerformanceMonitoring'
import AnalyticsProvider from 'react-storefront/AnalyticsProvider'
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
      <AnalyticsProvider targets={targets}>
        <TrackPageViews>
          <div>
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
            <Helmet>
              <link rel="shortcut icon" href="/icons/favicon.ico" />
              <meta
                name="description"
                content="Build and deploy sub-second e-commerce progressive web apps in record time."
              />
            </Helmet>
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
