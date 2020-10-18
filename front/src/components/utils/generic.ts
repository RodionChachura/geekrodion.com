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