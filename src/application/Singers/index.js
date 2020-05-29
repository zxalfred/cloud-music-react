import React, { memo, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Horizen from '@/baseUI/horizenItem'
import { categoryTypes, alphaTypes } from '@/api/config'
import Scroll from '@/baseUI/scroll'
import LazyImage from '@/baseUI/lazyImage'
import {
  NavContainer, ListContainer, List, ListItem,
} from './style'
import { actionCreators } from './store'

const renderSingerList = () => {
  const singerList = useSelector((state) => state.singers.singerList)
  const enterLoading = useSelector((state) => state.singers.enterLoading)
  const pullUpLoading = useSelector((state) => state.singers.pullUpLoading)
  const pullDownLoading = useSelector((state) => state.singers.pullDownLoading)
  const pageCount = useSelector((state) => state.singers.pageCount)

  return (
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
}


function Singers() {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const handleUpdateCategory = useCallback((val) => {
    setCategory((prevVal) => {
      if (prevVal === val) return ''
      return val
    })
  })

  const handleUpdateAlpha = useCallback((val) => {
    setAlpha((prevVal) => {
      if (prevVal === val) return ''
      return val
    })
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
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default memo(Singers)
