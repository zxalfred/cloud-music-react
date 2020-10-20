import React, {
  memo, useState, useCallback,
} from 'react'
import { useDispatch } from 'react-redux'
import Horizen from '@/baseUI/horizenItem'
import { categoryTypes, alphaTypes } from '@/api/config'
import Scroll from '@/baseUI/scroll'
import LazyImage from '@/baseUI/lazyImage'
import {
  NavContainer, ListContainer, List, ListItem,
} from './style'
import { actionCreators } from './store'
import useSingerListData from './hooks/useSingerListData'
import Loading from '../../baseUI/loading'

const renderSingerList = (singerList, reachedBottom) => (
  <List>
    {
      singerList.map((item) => (
        <ListItem key={item.id}>
          <div className="img-wrapper">
            <LazyImage dataSrc={`${item.picUrl}?param=300x300`} src="/music.png" width="100%" height="100%" alt="music" />
          </div>
          <span className="nam">{item.name}</span>
        </ListItem>
      ))
    }
    {reachedBottom && <div className="reach-bottom-tip">到底啦！</div>}
  </List>
)


function Singers() {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const dispatch = useDispatch()
  const [
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    reachedBottom,
  ] = useSingerListData()

  // 筛选歌手列表
  const getSingerList = useCallback((category, alpha) => {
    dispatch(actionCreators.changePageCount(0))
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getSingerList(category, alpha))
  })
  // 滑动到底部
  const pullUpRefresh = useCallback((category, alpha, count) => {
    if (reachedBottom) return
    dispatch(actionCreators.changePageCount(count + 50))
    if (category === '' && alpha === '') {
      dispatch(actionCreators.getMoreHotSingerList())
    } else {
      dispatch(actionCreators.getMoreSingerList(category, alpha))
    }
  }, [reachedBottom])
  // 下拉刷新
  const pullDownRefresh = useCallback((category, alpha) => {
    dispatch(actionCreators.changePullDownLoading(true))
    dispatch(actionCreators.changePageCount(0))
    if (category === '' && alpha === '') {
      dispatch(actionCreators.getHotSingerList())
    } else {
      dispatch(actionCreators.getSingerList(category, alpha))
    }
  })

  const handleUpdateCategory = useCallback((val) => {
    let newVal = val
    if (category === val) newVal = ''
    setCategory(newVal)
    getSingerList(newVal, alpha)
  })

  const handleUpdateAlpha = useCallback((val) => {
    let newVal = val
    if (alpha === val) newVal = ''
    setAlpha(newVal)
    getSingerList(category, newVal)
  })

  const handlePullUp = useCallback(() => {
    pullUpRefresh(category, alpha, pageCount)
  }, [category, alpha, pageCount])

  const handlePullDown = useCallback(() => {
    pullDownRefresh(category, alpha)
  }, [category, alpha])

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title="分类（默认热门）:"
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <Horizen
          list={alphaTypes}
          title="首字母:"
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
        >
          {renderSingerList(singerList, reachedBottom)}
        </Scroll>
        {enterLoading && <Loading />}
      </ListContainer>
    </div>
  )
}

export default memo(Singers)
