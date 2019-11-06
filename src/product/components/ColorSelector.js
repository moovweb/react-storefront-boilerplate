import React from 'react'
import { withStyles } from '@material-ui/core'
import BaseButtonSelector from 'react-storefront/ButtonSelector'

const styles = theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '.75rem',
    '& button': {
      position: 'relative',
      border: 0,
      margin: 0,
      padding: 0,
      width: '2rem',
      height: '2rem',
      minWidth: '2rem',
      minHeight: '2rem',
      transition: 'all .3s ease-in-out',
      '& span': {
        minWidth: '2rem',
        minHeight: '2rem',
      },
      '&:hover': {
        minWidth: '3rem',
        minHeight: '3rem',
        boxShadow: '0 4px 4px -2px #c8c9cb'
      }
    },
  },
  selectedImage: {
    '& button': {
      minWidth: '3rem',
      minHeight: '3rem',
      boxShadow: '0 4px 4px -2px #c8c9cb'
    },
  },
  imageLabel: {
    padding: 0,
    top: 'initial',
    bottom: 'initial',
    right: 'initial',
    left: 'initial'
  },
  strikeThrough: {
    height: '2px',
    top: 'calc(50% - 1px)',
    width: '2rem',
    border: 0,
  },
  disabled: {
    backgroundColor: 'transparent'
  }
})

const ColorSelector = ({ classes, ...props }) => (
  <BaseButtonSelector classes={classes} {...props} />
)

export default withStyles(styles)(ColorSelector)
