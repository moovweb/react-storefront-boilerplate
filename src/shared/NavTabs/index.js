import React from 'react'
import { withStyles } from '@material-ui/core'
import BaseNavTabs from 'react-storefront/NavTabs'

const styles = theme => ({
  root: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  menu: {
    marginTop: '114px',
    '& a': {
      textDecoration: 'none',
      fontSize: '14px',
      color: theme.palette.dark,
      '&:hover': {
        opacity: '0.7'
      }
    }
  },
})

const NavTabs = ({ classes, ...props }) => (
  <BaseNavTabs classes={classes} {...props} />
)

export default withStyles(styles)(NavTabs)
