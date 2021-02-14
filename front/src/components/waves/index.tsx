// @ts-nocheck
import React from 'react'

import { getNow } from '../utils/time'

let hasTouch = false
if (typeof window !== 'undefined') {
  hasTouch =
    'ontouchstart' in window
}

let killStale = ({ mouseUp, duration }) =>
  !mouseUp || getNow() - mouseUp < duration

function Store(publicize) {
  let _data = []
  let _playing = false
  let _frame

  let Store = {
    each(callback, scope) {
      for (var i = 0, l = _data.length; i < l; i++) {
        callback.call(scope, _data[i])
      }
    },

    play() {
      if (!_playing) {
        _playing = true
        Store.update()
      }
    },

    stop() {
      _playing = false
      cancelAnimationFrame(_frame)
    },

    getTotalOpacity(opacity) {
      let answer = 0

      for (var i = 0, l = _data.length; i < l; i++) {
        answer += getBlotOuterOpacity(_data[i], opacity)
      }

      return answer
    },

    update() {
      _data = _data.filter(killStale)

      if (_data.length) {
        _frame = requestAnimationFrame(Store.update)
      } else {
        Store.stop()
      }

      publicize()
    },

    add(props) {
      _data.push(props)
      Store.play()
    },

    release(time) {
      for (let i = _data.length - 1; i >= 0; i--) {
        if (!_data[i].mouseUp) {
          return (_data[i].mouseUp = time)
        }
      }
    }
  }

  return Store
}

function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b
}

const SQRT_2 = Math.sqrt(2)
const { cos, max, min } = Math

function getPress(blot) {
  return min(blot.duration, getNow() - blot.mouseDown)
}

function getRelease(blot) {
  return blot.mouseUp > 0 ? getNow() - blot.mouseUp : 0
}

function getRadius(blot) {
  let { duration, radius } = blot

  let down = easeOutQuint(getPress(blot), 0, radius, duration) * 0.85
  let up = easeOutQuint(getRelease(blot), 0, radius, duration) * 0.15
  let undulation = radius * 0.02 * cos(getNow() / duration)

  return max(0, down + up + undulation)
}

function getMaxRadius(height, width) {
  return max(height, width)
}
function getBlotOpacity(blot, opacity) {
  return easeOutQuint(getRelease(blot), opacity, -opacity, blot.duration)
}

function getBlotOuterOpacity(blot, opacity) {
  return min(
    getBlotOpacity(blot, opacity),
    easeOutQuint(getPress(blot), 0, 0.3, blot.duration * 3)
  )
}

function getBlotShiftX(blot, size, width) {
  return min(1, ((getRadius(blot) / size) * 2) / SQRT_2) * (width / 2 - blot.x)
}

function getBlotShiftY(blot, size, height) {
  return min(1, ((getRadius(blot) / size) * 2) / SQRT_2) * (height / 2 - blot.y)
}

function getBlotScale(blot) {
  return getRadius(blot) / blot.radius
}

function merge(/* args */) {
  let copy = {}

  for (var i = 0; i < arguments.length; i++) {
    let subject = arguments[i]

    if (subject) {
      for (var key in subject) {
        copy[key] = subject[key]
      }
    }
  }

  return copy
}

const pixelRatio = context => {
  let devicePixelRatio = window.devicePixelRatio || 1
  let backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1

  return devicePixelRatio / backingStoreRatio
}

const TAU = Math.PI * 2
const MOUSE_LEFT = 0

const STYLE = {
  borderRadius: 'inherit',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%'
}

const defaultProps = {
  background: false,
  className: 'waves',
  duration: 1200,
  opacity: 0.1,
  recenter: true,
  hasTouch
}

class Waves extends React.PureComponent {
  constructor(props) {
    super(...arguments)

    this.state = {
      color: 'transparent',
      density: 1,
      height: 0,
      store: Store(this.tick.bind(this)),
      width: 0
    }

    this.touchEvents = this.touchEvents()
  }

  touchEvents() {
    if (this.props.hasTouch) {
      return {
        onTouchStart: this._onPress.bind(this),
        onTouchEnd: this._onRelease.bind(this),
        onTouchCancel: this._onRelease.bind(this)
      }
    } else {
      return {
        onMouseDown: this._onPress.bind(this),
        onMouseUp: this._onRelease.bind(this),
        onMouseLeave: this._onRelease.bind(this)
      }
    }
  }

  tick() {
    let { ctx, color, density, height, width, store } = this.state

    ctx.save()

    ctx.scale(density, density)

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = color

    if (this.props.background) {
      ctx.globalAlpha = store.getTotalOpacity(this.props.opacity)
      ctx.fillRect(0, 0, width, height)
    }

    store.each(this.makeBlot, this)

    ctx.restore()
  }

  makeBlot(blot) {
    let { ctx, height, width } = this.state
    let { x, y, radius } = blot

    ctx.globalAlpha = getBlotOpacity(blot, this.props.opacity)
    ctx.beginPath()

    if (this.props.recenter) {
      let size = Math.max(height, width)

      x += getBlotShiftX(blot, size, width)
      y += getBlotShiftY(blot, size, height)
    }

    ctx.arc(x, y, radius * getBlotScale(blot), 0, TAU)

    ctx.closePath()
    ctx.fill()
  }

  componentWillUnmount() {
    this.state.store.stop()
  }

  pushBlot(timeStamp, clientX, clientY) {
    let el = this.canvas

    // 0.13 support
    if (el.getDOMNode && 'function' === typeof el.getDOMNode) {
      el = el.getDOMNode()
    }

    let { top, bottom, left, right } = el.getBoundingClientRect()
    let color = this.props.color || 'white'

    let ctx = this.state.ctx || el.getContext('2d')
    let density = pixelRatio(ctx)
    let height = bottom - top
    let width = right - left
    let radius = getMaxRadius(height, width)

    this.setState({ color, ctx, density, height, width }, () => {
      this.state.store.add({
        duration: this.props.duration,
        mouseDown: timeStamp,
        mouseUp: 0,
        radius: radius,
        x: clientX - left,
        y: clientY - top
      })
    })
  }

  setCanvas(el) {
    this.canvas = el
  }

  render() {
    let { density, height, width } = this.state
    let { style } = this.props

    let props = merge(
      {
        className: this.props.className,
        ref: this.setCanvas.bind(this),
        height: height * density,
        width: width * density,
        onDragOver: this._onRelease,
        style: merge(STYLE, style)
      },
      this.touchEvents
    )

    return React.createElement('canvas', props)
  }

  _onPress(event) {
    let { button, ctrlKey, clientX, clientY, changedTouches } = event
    let timeStamp = getNow()

    if (changedTouches) {
      for (var i = 0; i < changedTouches.length; i++) {
        let { clientX, clientY } = changedTouches[i]
        this.pushBlot(timeStamp, clientX, clientY)
      }
    } else if (button === MOUSE_LEFT && !ctrlKey) {
      this.pushBlot(timeStamp, clientX, clientY)
    }
  }

  _onRelease() {
    this && this.state.store.release(getNow())
  }
}

export default Waves

Waves.defaultProps = defaultProps
