import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { actionCreators } from '../store'

export default function () {
  const dispatch = useDispatch()
  const { id } = useParams()
  const artist = useSelector((state) => state.singerInfo.artist)
  const songs = useSelector((state) => state.singerInfo.songsOfArtist)
  const loading = useSelector((state) => state.singerInfo.loading)

  useEffect(() => {
    dispatch(actionCreators.getSingerInfo(id))
  }, [id])

  return [artist, songs, loading]
}
