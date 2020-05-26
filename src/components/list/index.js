import React from 'react'
import PropTypes from 'prop-types'
import { getCount } from '@/api/utils'
import {
  ListWrapper,
  ListItem,
  List,
} from './style'

function RecommendList(props) {
  const { recommendList } = props

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map((item) => (
            <ListItem key={item.id}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))
        }
      </List>
    </ListWrapper>
  )
}

RecommendList.propTypes = {
  recommendList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    picUrl: PropTypes.string,
    playCount: PropTypes.number,
    name: PropTypes.string,
  })),
}

RecommendList.defaultProps = {
  recommendList: [],
}

export default React.memo(RecommendList)
