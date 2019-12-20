import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

@withStyles(theme => ({
  root: {
    padding: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
export default class Footer extends Component {
  render() {
    const { classes } = this.props
    return <div className={classes.root}>app footer goes here</div>
  }
}
