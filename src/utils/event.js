const eventTag = {}

export function on(event, handler, isFirst) {
  if (!Array.isArray(eventTag[event])) {
    eventTag[event] = []
  }
  if (isFirst) {
    eventTag[event].unshift(handler)
  } else {
    eventTag[event].push(handler)
  }
}

export function off(event, handler) {
  if (Array.isArray(eventTag[event])) {
    if (!handler) {
      eventTag[event].length = 0
    } else {
      for (let i = 0; i < eventTag[event].length; i++) {
        if (eventTag[event][i] === handler) {
          eventTag[event].splice(i, 1)
          return false
        }
      }
    }
  }
}

export async function emit(event, data) {
  let isStop = false
  const e = {
    stop() {
      isStop = true
    },
    data
  }
  if (Array.isArray(eventTag[event])) {
    for (let handler of eventTag[event]) {
      if (isStop) {
        break;
      }
      if (typeof handler === 'function') {
        await handler(e)
      }
    }
  }
}

export default eventTag
