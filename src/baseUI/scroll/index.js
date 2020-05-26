import React, {
  useState, useRef, forwardRef, useEffect, useImperativeHandle,
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const {
    direction, click, refresh, bounceBottom, bounceTop, onScroll, pullUp, pullDown, children,
  } = props
  const scrollContainerRef = useRef()
  const [bScroll, setBScroll] = useState()

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
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])

  // 绑定下拉到顶事件
  useEffect(() => {
    if (!bScroll || !pullDown) return undefined
    bScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        pullDown()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll])

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
