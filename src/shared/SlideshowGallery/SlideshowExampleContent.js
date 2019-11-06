import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '50%',
    padding: '5rem 5rem 5rem 7rem',
    height: '100%',
    width: '50%',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  collection: theme.slideshowGallery.collection,
  slogan: theme.slideshowGallery.slogan,
  button: theme.slideshowGallery.button,
})

const SlideshowExampleContent = ({ align = 'left', classes }) => (
  <div className={classes.root} style={ align === 'left' ? { left: 0 } : { right: 0 }}>
    <span className={classes.collection}>
      Summer Collection 2019<br />
    </span>
    <span className={classes.slogan}>
      Colorful summer dresses are already in store
    </span>
    <div>
      <button className={classes.button}>
        Learn more
      </button>
    </div>
  </div>
)

export default withStyles(styles)(SlideshowExampleContent)
