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
import Offline from 'react-storefront/Offline'
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
      </AnalyticsProvider>
    )
  }
}
