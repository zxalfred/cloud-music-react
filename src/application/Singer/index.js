import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Header from '@/baseUI/header'
import { Container, ImgWrapper, CollectButton } from './style'

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
        />
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter" />
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)
