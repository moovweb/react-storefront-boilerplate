import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from 'react-storefront/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles'
import CartButton from 'react-storefront/CartButton'
import HeaderLogo from 'react-storefront/HeaderLogo'
import Hidden from '@material-ui/core/Hidden'
import Menu from 'react-storefront/Menu'
import SearchField from 'react-storefront/SearchField'

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

    return (
      <div>
        <AppBar classes={{ root: classes.root }} responsive>
          <Menu useExpanders/>
          <HeaderLogo>
            <img alt="shopify logo" src="https://cdn.shopify.com/s/files/1/0200/7466/files/shopify-logo6a_800x.png?v=1515190687" width={100} />
          </HeaderLogo>
          <div style={{ flex: 1 }}/>
          <Hidden smDown implementation="css">
            <SearchField className={classes.searchField}/>
          </Hidden>
          <Hidden mdUp implementation="css">
            <IconButton aria-label="Search" color="inherit"  classes={{label: classes.large }} onClick={this.onSearchClick}>
              <Search className={classes.icon}/>
            </IconButton>
          </Hidden>
          <CartButton classes={{ icon: classes.icon }}/>
        </AppBar>
      </div>
    )
  }

  onSearchClick = () => {
    this.props.app.search.toggle(true)
  }
 
}
