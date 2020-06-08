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
