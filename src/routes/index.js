import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
import Singers from '../application/Singers'
import Recommend from '../application/Recommend'
import Rank from '../application/Rank'
import Album from '../application/Album'
import Singer from '../application/Singer/index'

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (
          <Redirect to="/recommend" />
        ),
      },
      {
        path: '/recommend',
        component: Recommend,
        routes: [
          {
            path: '/recommend/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/singers',
        component: Singers,
        routes: [
          {
            path: '/singers/:id',
            component: Singer,
          },
        ],
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: '/rank/:id',
            component: Album,
          },
        ],
      },
    ],
  },
]
