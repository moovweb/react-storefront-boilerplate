import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'
import SlideshowElement from './SlideshowElement';
import SlideshowBullets from './SlideshowBullets';

const styles = theme => ({
  root: {
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    transition: 'transform, .5s'
  },
  box: {
    display: 'inline-block',
    background: 'blue',
  }
})

const SlideshowGallery = ({ elements, width, height, backgroundColor, slideInterval = 5000, classes }) => {
  const [offset, setOffset] = useState(0);

  const selectSlide = (slideNumber) => elements[slideNumber] !== undefined
    ? setOffset(slideNumber)
    : setOffset(slideNumber < 0 ? elements.length - 1 : 0)

  useEffect(() => {
    const timeout = setTimeout(() => selectSlide(offset + 1), slideInterval)

    return () => {
      clearTimeout(timeout)
    }
  }, [offset])

  return (
    <div
      className={classes.root}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor
      }}
    >
      <div className={classes.container} style={{
        transform: `translate3d(${-offset * width}px, 0, 0)`,
      }}>
        {elements.map((element, key) => (
          <SlideshowElement
            key={key}
            backgroundImage={element.backgroundImage} 
            width={width}
            height={height}
            renderComponent={element.renderComponent}
          />
        ))}
      </div>
      <SlideshowBullets elements={elements} selectSlide={selectSlide} activeSlide={offset} />
    </div>
  )
}

SlideshowGallery.propTypes = {
  elements: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  slideInterval: PropTypes.number
}

export default withStyles(styles)(SlideshowGallery);