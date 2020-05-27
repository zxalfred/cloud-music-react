import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@/components/slider'
import RecommendList from '@/components/list'
import Scroll from '@/baseUI/scroll'
import { actionCreators } from './store'
import { Content } from './style'

function Recommend() {
  const bannerList = useSelector((state) => state.recommend.bannerList)
  const recommendList = useSelector((state) => state.recommend.recommendList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreators.getBannerList())
    dispatch(actionCreators.getRecommendList())
  }, [])

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
