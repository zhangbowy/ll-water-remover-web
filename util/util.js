export function getUrlToObg(url) {
  const arr = url.split("&")
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const arrItem = arr[i].split("=")
    obj[arrItem[0]] = arrItem[1]
  }
  return obj
}