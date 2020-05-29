import React from 'react'
import LazyLoad from 'vanilla-lazyload'
import PropTypes from 'prop-types'

// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  })
}

class LazyImage extends React.Component {
  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update()
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update()
  }

  // Just render the image with data-src
  render() {
    const {
      alt, src, dataSrc, width, height,
    } = this.props
    return (
      <img
        alt={alt}
        className="lazy"
        data-src={dataSrc}
        src={src}
        width={width}
        height={height}
      />
    )
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
}

LazyImage.defaultProps = {
  alt: '',
}

export default LazyImage
