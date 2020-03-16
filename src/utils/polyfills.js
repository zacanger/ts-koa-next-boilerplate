import 'core-js/es6/set'
import 'core-js/es6/map'
import 'core-js/es6/symbol'
import 'core-js/es6/array'
import 'core-js/es7/array'
import 'core-js/es6/object'

const addCustomEventPolyfill = () => {
  if (typeof window.CustomEvent === 'function') {
    // If not IE
    return false
  }

  // eslint-disable-next-line
  function CustomEvent(
    event,
    params = { bubbles: false, cancelable: false, detail: undefined }
  ) {
    const { bubbles, cancelable, detail } = params
    const customEvent = document.createEvent('CustomEvent')

    customEvent.initCustomEvent(customEvent, bubbles, cancelable, detail)

    return customEvent
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
}

const addArrayFlatPolyfill = () => {
  const ArrayPrototype = Array.prototype

  if ('flatten' in ArrayPrototype && !('flat' in ArrayPrototype)) {
    ArrayPrototype.flat = ArrayPrototype.flatten
  }
}
addCustomEventPolyfill()
addArrayFlatPolyfill()
