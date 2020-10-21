import React, {
  useState, useCallback, useRef, useEffect,
} from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Header from '@/baseUI/header'
import Scroll from '@/baseUI/scroll'
import {
  Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer,
} from './style'
import SongsList from '../SongsList'

function Singer() {
  const [showStatus, setShowStatus] = useState(true)
  const history = useHistory()

  const handleExit = useCallback(() => {
    history.goBack()
  })
  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const artist = {
    picUrl: 'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
    name: '薛之谦',
    hotSongs: [
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑',
        },
      },
      {
        name: '我好像在哪见过你',
        ar: [{ name: '薛之谦' }],
        al: {
          name: '薛之谦专辑',
        },
      },
      // 省略 20 条
    ],
  }

  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const songScroll = useRef()
  const header = useRef()
  const layer = useRef()
  // 图片初始高度
  const initialHeight = useRef(0)
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5

  useEffect(() => {
    const h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initialHeight.current = h
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
    // eslint-disable-next-line
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      unmountOnExit
      onExited={handleExit}
    >
      <Container>
        <Header
          title="头部"
          handleClick={handleBack}
          ref={header}
        />
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter" />
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer} />
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongsList
              songs={artist.hotSongs}
              showCollect={false}
            />
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)
