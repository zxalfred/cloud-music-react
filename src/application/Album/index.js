import React, {
  useState, useCallback, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import Header from '@/baseUI/header'
import Scroll from '@/baseUI/scroll'
import { getName, getCount, isEmptyObject } from '@/api/utils'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/baseUI/loading'
import {
  Container,
  TopDesc,
  Menu,
  SongList,
  SongItem,
} from './style'
import { actionCreators } from './store'

function Album(props) {
  const { history, match } = props
  const { id } = match.params

  const dispatch = useDispatch()

  const currentAlbum = useSelector((state) => state.album.currentAlbum)
  const enterLoading = useSelector((state) => state.album.enterLoading)
  const [showStatus, setShowStatus] = useState(true)

  useEffect(() => {
    const getAlbumData = () => {
      dispatch(actionCreators.changeEnterLoading(true))
      dispatch(actionCreators.getAlbumList(id))
    }
    getAlbumData()
  }, [id])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const renderTopDesc = () => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background" />
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="" />
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
  )

  const renderMenu = () => (
    <Menu>
      <div><i className="iconfont">&#xe6ad;</i>评论</div>
      <div><i className="iconfont">&#xe86f;</i>点赞</div>
      <div><i className="iconfont">&#xe62d;</i>收藏</div>
      <div><i className="iconfont">&#xe606;</i>更多</div>
    </Menu>
  )

  const renderSongList = () => (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span> 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {
          currentAlbum.tracks.map((item, index) => (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  { getName(item.ar) } - { item.al.name }
                </span>
              </div>
            </li>
          ))
        }
      </SongItem>
    </SongList>
  )

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      unmountOnExit
      onExited={history.goBack}
    >
      <Container>
        <Header
          title="返回"
          handleClick={handleBack}
        />
        { enterLoading && <Loading /> }
        {
          !isEmptyObject(currentAlbum)
          && (
            <Scroll bounceTop={false}>
              <div>
                {renderTopDesc()}
                {renderMenu()}
                {renderSongList()}
              </div>
            </Scroll>
          )
        }
      </Container>
    </CSSTransition>
  )
}

Album.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}


export default React.memo(Album)
