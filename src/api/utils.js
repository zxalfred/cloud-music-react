import { RankTypes } from './config'

export const getCount = (count) => {
  if (!count || count < 0) return 0
  if (count < 10000) {
    return count
  } if (Math.floor(count / 10000) < 10000) {
    return `${Math.floor(count / 1000) / 10}万`
  }
  return `${Math.floor(count / 10000000) / 10}亿`
}

export const debounce = (func, delay) => {
  let timer
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1
    }
  }
  return -1
}

// 找出排行榜的编号
export const filterIdx = (name) => {
  for (const key in RankTypes) {
    if (RankTypes[key] === name) return key
  }
  return null
}

export const getName = (list) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : `/${item.name}`
    return item
  })
  return str
}

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0
