import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import {
  Container,
} from './style'

function Album(props) {
  const { history } = props
  const [showStatus, setShowStatus] = useState(true)

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      unmountOnExit
      onExit={history.goBack}
    >
      <Container>

      </Container>
    </CSSTransition>
  )
}

Album.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
}


export default React.memo(Album)
