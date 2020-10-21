import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { getCount, getName } from '@/api/utils'
import { SongList, SongItem } from './style'


const SongsList = React.forwardRef((props, refs) => {
  const {
    collectCount, showCollect, songs, showBackground,
  } = props
  const { length: totalCount } = songs

  const selectItem = useCallback((e, index) => {
    console.log(index)
  })

  const songList = (list) => list.map((item, index) => (
    <li key={item.id} onClick={(e) => selectItem(e, index)}>
      <span className="index">{index + 1}</span>
      <div className="info">
        <span>{item.name}</span>
        <span>
          { item.ar ? getName(item.ar) : getName(item.artists) }
          - { item.al ? item.al.name : item.album.name }
        </span>
      </div>
    </li>
  ))

  const collect = (count) => (
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      <span>收藏{getCount(count)}</span>
    </div>
  )

  return (
    <SongList ref={refs} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部<span className="sum">(共 {totalCount} 首歌)</span></span>
        </div>
        { showCollect ? collect(collectCount) : null }
      </div>
      <SongItem>
        { songList(songs) }
      </SongItem>
    </SongList>
  )
})

SongsList.propTypes = {
  collectCount: PropTypes.number,
  showCollect: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.object),
  showBackground: PropTypes.bool,
}

SongsList.defaultProps = {
  collectCount: 0,
  showCollect: false,
  songs: [],
  showBackground: false,
}

export default React.memo(SongsList)
