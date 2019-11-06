import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: '0 0',
    backgroundRepeat: 'no-repeat',
  }
}

const SlideshowElement = ({ width, height, backgroundImage, classes, renderComponent = null }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    try {
      const fetchImage = require(`../../assets/${backgroundImage}`)

      setImage(fetchImage)
    } catch (e) {
      setImage(null)
    }
  }, [backgroundImage])

  return (
    <div 
      className={classes.root}
      style={{
        flex: `0 0 ${width}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: image !== null ? `url(${image})` : 'none'
      }}
    >
      { typeof renderComponent === 'function' && renderComponent() }
    </div>
  )
}



export default withStyles(styles)(SlideshowElement);