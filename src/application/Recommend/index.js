import React from 'react'
import Slider from '@/components/slider'
import RecommendList from '@/components/list'
import Scroll from '@/baseUI/scroll'
import { Content } from './style'

function Recommend() {
  const bannerList = [1, 2, 3, 4].map((item, index) => ({
    imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg',
    index,
  }))

  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
    id: item,
    picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
    playCount: 12345678,
    name: '王菲、杨宗纬、陈奕迅、房东的猫',
  }))

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
