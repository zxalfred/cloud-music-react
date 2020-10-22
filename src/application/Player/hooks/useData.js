import { useSelector } from 'react-redux'

function useData() {
  const fullScreen = useSelector((state) => state.player.fullScreen)
  const playing = useSelector((state) => state.player.playing)
  const currentSong = useSelector((state) => state.player.currentSong)
  const showPlayList = useSelector((state) => state.player.showPlayList)
  const mode = useSelector((state) => state.player.mode)
  const currentIndex = useSelector((state) => state.player.currentIndex)
  const playList = useSelector((state) => state.player.playList)
  const sequencePlayList = useSelector((state) => state.player.sequencePlayList)

  return [
    fullScreen, playing, currentSong,
    showPlayList, mode, currentIndex,
    playList, sequencePlayList,
  ]
}

export default useData
