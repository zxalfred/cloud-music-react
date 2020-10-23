import React from 'react'
import useData from './hooks/useData'
import MiniPlayer from './miniiPlayer'

function Player() {
  // const [
  //   fullScreen, playing, currentSong,
  //   showPlayList, mode, currentIndex,
  //   playList, sequencePlayList,
  // ] = useData()

  const currentSong = {
    al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
    name: '木偶人',
    ar: [{ name: '薛之谦' }],
  }

  return (
    <div>
      <MiniPlayer song={currentSong} />
    </div>
  )
}

export default React.memo(Player)
