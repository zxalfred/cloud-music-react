import React, { memo, useState, useCallback } from 'react'
import Horizen from '@/baseUI/horizenItem'
import { categoryTypes, alphaTypes } from '@/api/config'
import { NavContainer } from './style'

function Singers() {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const handleUpdateCategory = useCallback((val) => {
    setCategory((prevVal) => {
      if (prevVal === val) return ''
      return val
    })
  })

  const handleUpdateAlpha = useCallback((val) => {
    setAlpha((prevVal) => {
      if (prevVal === val) return ''
      return val
    })
  })

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title="分类（默认热门）:"
        handleClick={handleUpdateCategory}
        oldVal={category}
      />
      <Horizen
        list={alphaTypes}
        title="首字母:"
        handleClick={handleUpdateAlpha}
        oldVal={alpha}
      />
    </NavContainer>
  )
}

export default memo(Singers)
