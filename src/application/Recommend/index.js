import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@/components/slider'
import RecommendList from '@/components/list'
import Scroll from '@/baseUI/scroll'
import Loading from '@/baseUI/loading'
import { renderRoutes } from 'react-router-config'
import { actionCreators } from './store'
import { Content } from './style'

function Recommend(props) {
  const bannerList = useSelector((state) => state.recommend.bannerList)
  const recommendList = useSelector((state) => state.recommend.recommendList)
  const enterLoading = useSelector((state) => state.recommend.enterLoading)
  const { route } = props
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
      {renderRoutes(route.routes)}
    </Content>
  )
}

Recommend.propTypes = {
  route: PropTypes.shape({ routes: PropTypes.arrayOf(PropTypes.object) }).isRequired,
}

export default React.memo(Recommend)
