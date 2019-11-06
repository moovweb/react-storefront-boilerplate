import React from 'react'
import { withStyles } from '@material-ui/core'
import BaseNavTabs from 'react-storefront/NavTabs'

const styles = theme => ({
})

const NavTabs = ({ classes, ...props }) => (
  <BaseNavTabs classes={classes} {...props} />
)

export default withStyles(styles)(NavTabs)
