import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import {
  Top,
  Tab,
  TabItem,
} from './style'

function Home(props) {
  const { route } = props

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="titlt">云音悦</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      { renderRoutes(route.routes) }
    </div>
  )
}

Home.propTypes = {
  route: PropTypes.shape({ routes: PropTypes.arrayOf(PropTypes.object) }).isRequired,
}

export default React.memo(Home)
