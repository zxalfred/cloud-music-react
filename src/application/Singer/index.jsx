import React, {
  useState, useCallback, useRef, useEffect,
} from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Header from '@/baseUI/header'
import Scroll from '@/baseUI/scroll'
import { HEADER_HEIGHT } from '@/api/config'
import Loading from '@/baseUI/loading'
import useSingerInfo from './hooks/useSingerInfo'
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

  const [artist, songs, loading] = useSingerInfo()

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

  const handleScroll = useCallback((pos) => {
    const height = initialHeight.current
    const newY = pos.y
    const imageDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const headerDOM = header.current
    const layerDOM = layer.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT

    const percent = Math.abs(newY / height)

    if (newY > 0) {
      imageDOM.style.transform = `scale(${1 + percent})`
      buttonDOM.style.transform = `translateY(${newY}px)`
      layerDOM.style.top = `${height - OFFSET + newY}px`
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`
      layerDOM.style.zIndex = 1
      imageDOM.style.paddingTop = '75%'
      imageDOM.style.height = 0
      imageDOM.style.zIndex = -1
      buttonDOM.style.transform = `translateY(${newY}px)`
      buttonDOM.style.opacity = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM.style.zIndex = 1
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`
      imageDOM.style.paddingTop = 0
      imageDOM.style.zIndex = 99
    }
  })

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
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
            />
          </Scroll>
        </SongListWrapper>
        { loading && <Loading />}
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)
