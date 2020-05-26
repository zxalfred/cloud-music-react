import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'swiper'
import { SliderContainer } from './style'
import 'swiper/css/swiper.css'

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const newSliderSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before" />
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            bannerList.map((slider) => (
              <div className="swiper-slide" key={slider.index}>
                <div className="slider-nav">
                  <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                </div>
              </div>
            ))
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

Slider.propTypes = {
  bannerList: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    imageUrl: PropTypes.string,
  })),
}

Slider.defaultProps = {
  bannerList: [],
}

export default React.memo(Slider)
