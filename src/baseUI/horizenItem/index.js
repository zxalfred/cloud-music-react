import React, {
  memo, useRef, useEffect,
} from 'react'
import Scroll from '@/baseUI/scroll'
import PropTypes from 'prop-types'
import style from '@/assets/global-style'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
  }
`

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: .8;
  }
`

function Horizen(props) {
  const {
    list, oldVal, title, handleClick,
  } = props
  const Category = useRef(null)

  // 初始化内容宽度
  useEffect(() => {
    const categoryDOM = Category.current
    const tagElems = categoryDOM.querySelectorAll('span')
    let totalWidth = 0
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? 'selected' : ''}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            ))
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object), // 接收的列表参数
  oldVal: PropTypes.string, // 当前的 item 值
  title: PropTypes.string, // 列表左边的标题
  handleClick: PropTypes.func, // 点击不同的 item 执行的方法
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
}

export default memo(Horizen)
