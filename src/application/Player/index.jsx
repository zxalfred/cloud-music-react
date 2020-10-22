import React from 'react'
import useData from './hooks/useData'

function Player(props) {
  const [
    fullScreen, playing, currentSong,
    showPlayList, mode, currentIndex,
    playList, sequencePlayList,
  ] = useData()

  return (
    <div>Player</div>
  )
}

export default React.memo(Player)
