'use strict'

const max = (arr) => {
  const n = arr.length
  let a = arr[0]

  for (let i = 1; i < n; i++) {
    if (a < arr[i]) a = arr[i]
  }
  return a
}

const min = (arr) => {
  const n = arr.length
  let a = arr[0]

  for (let i = 1; i < n; i++) {
    if (a > arr[i]) a = arr[i]
  }
  return a
}

export default {
  max,
  min
}
