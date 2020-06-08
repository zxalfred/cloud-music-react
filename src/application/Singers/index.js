import React, {
  memo, useState, useCallback, useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Horizen from '@/baseUI/horizenItem'
import { categoryTypes, alphaTypes } from '@/api/config'
import Scroll from '@/baseUI/scroll'
import LazyImage from '@/baseUI/lazyImage'
import {
  NavContainer, ListContainer, List, ListItem,
} from './style'
import { actionCreators } from './store'
import useSingerListData from './hooks/useSingerListData'

const renderSingerList = (singerList) => (
  <List>
    {
      singerList.map((item) => (
        <ListItem key={item.accountId}>
          <div className="img-wrapper">
            <LazyImage dataSrc={`${item.picUrl}?param=300x300`} src="/music.png" width="100%" height="100%" alt="music" />
          </div>
          <span className="nam">{item.name}</span>
        </ListItem>
      ))
      }
  </List>
)


function Singers() {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const dispatch = useDispatch()
  const singerList = useSingerListData()
  const enterLoading = useSelector((state) => state.singers.enterLoading)
  const pullUpLoading = useSelector((state) => state.singers.pullUpLoading)
  const pullDownLoading = useSelector((state) => state.singers.pullDownLoading)
  const pageCount = useSelector((state) => state.singers.pageCount)

  // 筛选歌手列表
  const getSingerList = (category, alpha) => {
    dispatch(actionCreators.changePageCount(0))
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getSingerList(category, alpha))
  }
  // 滑动到底部
  const pullUpRefresh = (category, alpha, hot, count) => {
    dispatch(actionCreators.changePullUpLoading(true))
    dispatch(actionCreators.changePageCount(count + 1))
    if (hot) {
      dispatch(actionCreators.getMoreHotSingerList())
    } else {
      dispatch(actionCreators.getMoreSingerList(category, alpha))
    }
  }
  // 下拉刷新
  const pullDownRefresh = (category, alpha) => {
    dispatch(actionCreators.changePullDownLoading(true))
    dispatch(actionCreators.changePageCount(0))
    if (category === '' && alpha === '') {
      dispatch(actionCreators.getHotSingerList())
    } else {
      dispatch(actionCreators.getSingerList(category, alpha))
    }
  }

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
        <Scroll>
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default memo(Singers)
