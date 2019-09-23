import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import IconButton from '@material-ui/core/IconButton'
import FindStore from '@material-ui/icons/LocationOn'
import Link from 'react-storefront/Link'
import { withStyles } from '@material-ui/core/styles'
import Logo from '../assets/react-storefront-logo.svg'
import CartButton from 'react-storefront/CartButton'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Menu from 'react-storefront/Menu'
import PromoBanner from 'react-storefront/PromoBanner'
import SearchField from 'react-storefront/SearchField'
import SearchButton from 'react-storefront/SearchButton'

@withStyles(theme => ({
  root: {
    height: '64px',
    position: 'relative'
  },

  buttonLabel: {
    position: 'relative',
    top: '-6px'
  },

  icon: {
    color: theme.palette.action.active
  },

  buttonText: {
    position: 'absolute',
    textTransform: 'uppercase',
    fontSize: '8px',
    top: '24px',
    color: theme.palette.action.active
  },

  promo: {
    maxHeight: '64px',
    backgroundColor: '#81d4fa'
  },

  searchField: {
    alignSelf: 'center',
    marginRight: '10px'
  },

  large: {
    fontSize: '28px'
  }
}))
@inject('app')
@observer
export default class Header extends Component {
  render() {
    const { classes } = this.props

    const storeFinder = (
      <Link to="/store-finder">
        <IconButton aria-label="Store Locator" color="inherit" classes={{ label: classes.large }}>
          <FindStore className={classes.icon} />
        </IconButton>
      </Link>
    )

    const promo = `https://placehold.it/750x128/81d4fa/fff?text=${encodeURIComponent(
      '25% OFF EVERYTHING'
    )}`

    return (
      <div>
        <AppBar classes={{ root: classes.root }} menuAlign="right" menuIconProps={{ label: false }}>
          <Menu align="right" useExpanders />
          <Hidden mdUp implementation="css">
            {storeFinder}
          </Hidden>
          <Hidden mdUp implementation="css">
            <SearchButton />
          </Hidden>
          <HeaderLogo>
            <Logo />
          </HeaderLogo>
          <div style={{ flex: 1 }} />
          <Hidden smDown implementation="css">
            <SearchField className={classes.searchField} />
          </Hidden>
          <Hidden smDown implementation="css">
            {storeFinder}
          </Hidden>
          <CartButton classes={{ icon: classes.icon }} />
        </AppBar>
        <PromoBanner
          className={classes.promo}
          src={promo}
          style={{ height: '64px' }}
          imgProps={{ quality: 50 }}
        />
      </div>
    )
  }

  onSearchClick = () => {
    this.props.app.search.toggle(true)
  }
}
