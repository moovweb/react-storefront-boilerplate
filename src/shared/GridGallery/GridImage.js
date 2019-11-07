import React, { useEffect, useState, useContext } from 'react';
import { withStyles } from '@material-ui/core';
import GridGalleryContext from './GridGalleryContext';

const styles = theme => ({
  root: {
    position: 'relative',
    marginTop: '1.25rem',

    '&:hover .rfc-grid-image': {
      opacity: 1
    } 
  },
  description: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29,31,34,.8)',
    color: '#fff',
    lineHeight: 1.6,
    transition: 'opacity, .3s'
  }
})

const GridImage = ({ filename, classes, description = null }) => {
  const { size } = useContext(GridGalleryContext)

  const [image, setImage] = useState(null);

  useEffect(() => {
    try {
      const fetchImage = require(`../../assets/${filename}`)

      setImage(fetchImage)
    } catch (e) {
    }
  }, [filename])

  return (
    <div className={classes.root} style={{ width: size, height: size }}>
      <img width={size} height={size} src={image} />
      { typeof description === 'string' && description.length > 0 && (
        <div className={`rfc-grid-image ${classes.description}`}>{description}</div>
      )}
    </div>
  )
}

export default withStyles(styles)(GridImage)
