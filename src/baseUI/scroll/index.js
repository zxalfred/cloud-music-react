import React, {
  useState, useRef, forwardRef, useEffect, useImperativeHandle, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import { debounce } from '@/api/utils'
import Loading from '../loading'
import Loading2 from '../loading-v2'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const Scroll = forwardRef((props, ref) => {
  const {
    direction,
    click,
    refresh,
    bounceBottom,
    bounceTop, onScroll, pullUp, pullDown, children, pullDownLoading, pullUpLoading,
  } = props
  const scrollContainerRef = useRef()
  const [bScroll, setBScroll] = useState()

  const pullUpDebounce = useMemo(() => debounce(pullUp, 300), [pullUp])
  const pullDownDebounce = useMemo(() => debounce(pullDown, 300), [pullDown])

  // 创建 better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])

  // 每次渲染时刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // 给实例绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) return undefined
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])

  // 绑定上拉到底事件
  useEffect(() => {
    if (!bScroll || !pullUp) return undefined
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll, pullUpDebounce])

  // 绑定下拉到顶事件
  useEffect(() => {
    if (!bScroll || !pullDown) return undefined
    bScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll, pullDownDebounce])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      return bScroll || undefined
    },
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {children}
      {pullUpLoading && <PullUpLoading><Loading /></PullUpLoading>}
      {pullDownLoading && <PullDownLoading><Loading2 /></PullDownLoading>}
    </ScrollContainer>
  )
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉触发的回调函数
  pullDown: PropTypes.func, // 下拉触发的回调函数
  pullUpLoading: PropTypes.bool, // 是否显示上拉加载 loading
  pullDownLoading: PropTypes.bool, // 是否显示下拉加载 loading
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸顶
  children: PropTypes.node,
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullDownLoading: false,
  pullUpLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
  children: null,
}

export default Scroll
