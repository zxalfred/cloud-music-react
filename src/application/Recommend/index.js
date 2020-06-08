import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@/components/slider'
import RecommendList from '@/components/list'
import Scroll from '@/baseUI/scroll'
import Loading from '@/baseUI/loading'
import { actionCreators } from './store'
import { Content } from './style'

function Recommend() {
  const bannerList = useSelector((state) => state.recommend.bannerList)
  const recommendList = useSelector((state) => state.recommend.recommendList)
  const enterLoading = useSelector((state) => state.recommend.enterLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.length) {
      dispatch(actionCreators.getBannerList())
    }
    if (!recommendList.length) {
      dispatch(actionCreators.getRecommendList())
    }
  }, [])

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading && <Loading />}
    </Content>
  )
}

export default React.memo(Recommend)
