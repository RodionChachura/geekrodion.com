export const noPropagation = (func?: Function) => (e: any) => {
  e && e.stopPropagation()
  func && func()
}

export const withPreventDefaultNoPropagation = func => e => {
  if (e) {
    e.preventDefault && e.preventDefault()
    e.stopPropagation && e.stopPropagation()
  }
  func && func(e)
}

export const registerListener = (...args: Parameters<typeof window.addEventListener>) => {
  window.addEventListener(...args)
  return () => window.removeEventListener(...args)
}

export const getFlatObject = (object: Object): any =>
  Object
    .values(object)
    .flat()
    .map(obj => Object.entries(obj))
    .flat()
    .reduce((acc: Object, [key, value]) => ({ ...acc, [key]: value }), {})