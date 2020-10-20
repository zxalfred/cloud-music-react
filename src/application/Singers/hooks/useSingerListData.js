import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators } from '../store'

export default function () {
  const dispatch = useDispatch()
  const singerList = useSelector((state) => state.singers.singerList)
  const enterLoading = useSelector((state) => state.singers.enterLoading)
  const pullUpLoading = useSelector((state) => state.singers.pullUpLoading)
  const pullDownLoading = useSelector((state) => state.singers.pullDownLoading)
  const pageCount = useSelector((state) => state.singers.pageCount)
  const reachedBottom = useSelector((state) => state.singers.reachedBottom)

  useEffect(() => {
    const getHotSinger = () => {
      dispatch(actionCreators.getHotSingerList())
    }
    getHotSinger()
  }, [])

  return [singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount, reachedBottom]
}
