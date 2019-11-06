import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  element: {
    display: 'block',
    cursor: 'pointer',
    borderRadius: '50%',
    margin: '0 6px'
  },
  active: {
    width: '10px',
    height: '10px',
    backgroundColor: '#9ee2b0'
  },
  inActive: {
    width: '8px',
    height: '8px',
    backgroundColor: '#6a6e7e'
  }
})

const SlideshowBullets = ({ elements, selectSlide, activeSlide, classes }) => (
  <div className={classes.root}>
    {elements.map((element, key) => (
      <span
        key={key} 
        onClick={() => selectSlide(key)}
        className={`${classes.element} ${activeSlide === key ? classes.active : classes.inActive}`}
      />
    ))}
  </div>
)

export default withStyles(styles)(SlideshowBullets);