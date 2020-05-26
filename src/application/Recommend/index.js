import React from 'react'
import Slider from '@/components/slider'

function Recommend() {
  const bannerList = [1, 2, 3, 4].map((item, index) => ({
    imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg',
    index,
  }))

  return (
    <div>
      <Slider bannerList={bannerList} />
    </div>
  )
}

export default React.memo(Recommend)
