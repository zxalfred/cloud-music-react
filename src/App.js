import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes/index'

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <IconStyle />
      <i className="iconfont">&#xe62b;</i>
      { renderRoutes(routes) }
    </HashRouter>
  )
}

export default App
