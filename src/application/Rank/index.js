import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { filterIndex, filterIdx } from '@/api/utils'
import Scroll from '@/baseUI/scroll'
import { renderRoutes } from 'react-router-config'
import Loading from '@/baseUI/loading'
import { getRankList } from './store'
import {
  List,
  ListItem,
  SongList,
  Container,
} from './style'
import { EnterLoading } from '../Singers/style'

const enterDetail = (name) => {
  const idx = filterIdx(name)
  if (idx === null) {
    console.log('暂无相关数据')
  }
}

const renderSongList = (list) => !!list.length && (
<SongList>
  {
    list.map((item, index) => (
      <li key={index}>
        {index + 1}. {item.first} - {item.second}
      </li>
    ))
  }
</SongList>
)

const renderRankList = (list, global) => (
  <List globalRank={global}>
    {
        list.map((item) => (
          <ListItem
            key={item.coverImgId}
            tracks={item.tracks}
            onClick={() => enterDetail(item.name)}
          >
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="" />
              <div className="decorate" />
              <span className="update_frequency">{item.updateFrequency}</span>
            </div>
            {renderSongList(item.tracks)}
          </ListItem>
        ))
      }
  </List>
)

function Rank(props) {
  const dispatch = useDispatch()
  const rankList = useSelector((store) => store.rank.rankList)
  const loading = useSelector((store) => store.rank.loading)

  const { route } = props

  useEffect(() => {
    const getRankListData = () => {
      dispatch(getRankList())
    }
    if (!rankList.length) {
      getRankListData()
    }
  }, [])

  const globalStartIndex = filterIndex(rankList)
  const officialList = rankList.slice(0, globalStartIndex)
  const globalList = rankList.slice(globalStartIndex)

  return (
    <Container>
      <Scroll>
        <div>
          {loading && <h1 className="official">官方榜</h1>}
          {renderRankList(officialList)}
          {loading && <h1 className="global">全球榜</h1>}
          {renderRankList(globalList, true)}
          {loading && <EnterLoading><Loading /></EnterLoading>}
        </div>
      </Scroll>
      {renderRoutes(route.routes)}
    </Container>
  )
}

Rank.propTypes = {
  route: PropTypes.shape({ routes: PropTypes.arrayOf(PropTypes.array) }).isRequired,
}

export default React.memo(Rank)
