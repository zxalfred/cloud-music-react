import React from 'react'
import styled from 'styled-components'
import style from '@/assets/global-style'
import PropTypes from 'prop-types'

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
  .marquee {
    width: 450px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
  }
  .marquee h1 {
      display: inline-block;
      padding-left: 100%;
      animation: marquee 7s linear infinite;
  }
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
  }
`

const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <div className="marquee"><h1>{title}</h1></div>
          : <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
}

Header.defaultProps = {
  handleClick: () => {},
  title: '标题',
  isMarquee: false,
}

export default React.memo(Header)
