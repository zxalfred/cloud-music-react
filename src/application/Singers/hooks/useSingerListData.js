import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../store'

export default function () {
  const dispatch = useDispatch()
  const singerList = useSelector((state) => state.singers.singerList)

  useEffect(() => {
    const getHotSinger = () => {
      dispatch(actionCreators.getHotSingerList())
    }
    getHotSinger()
  }, [])

  return singerList
}
