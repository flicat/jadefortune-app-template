

let touchHandlerMap = new WeakMap()

export default {
  mounted(el, binding) {
    let iconPositionX = 0
    let iconPositionY = 0
    let startX = 0
    let startY = 0
    let isDragStart = false
    let isDragMove = false

    if (typeof binding.value === 'object') {
      Object.entries(binding.value).forEach(([name, value]) => {
        el.style[name] = value
      })
    }
    el.style.willChange = 'transform'

    let touchHandler = (e) => {
      switch (e.type) {
        case 'touchstart':
          startX = e.touches[0].clientX - iconPositionX
          startY = e.touches[0].clientY - iconPositionY
          isDragStart = true
          break;
        case 'touchmove':
          if (isDragStart) {
            isDragMove = true
            e.preventDefault()
            e.stopPropagation()
            iconPositionX = e.touches[0].clientX - startX
            iconPositionY = e.touches[0].clientY - startY
            el.style.transform = 'translate(' + iconPositionX + 'px,' + iconPositionY + 'px' + ')'
          }
          break;
        case 'touchcancel':
        case 'touchend':
          if (isDragStart && isDragMove) {
            e.preventDefault()
            e.stopPropagation()
          }
          isDragStart = false
          isDragMove = false
          break;
      }
    }

    touchHandlerMap.set(el, touchHandler)

    el.addEventListener('touchstart', touchHandler, { passive: false })
    document.body.addEventListener('touchmove', touchHandler, { passive: false })
    document.body.addEventListener('touchend', touchHandler, { passive: false })
    document.body.addEventListener('touchcancel', touchHandler, { passive: false })
  },
  unmounted(el) {
    let touchHandler = touchHandlerMap.get(el)
    if (touchHandler) {
      el.removeEventListener('touchstart', touchHandler)
      document.body.removeEventListener('touchmove', touchHandler)
      document.body.removeEventListener('touchend', touchHandler)
      document.body.removeEventListener('touchcancel', touchHandler)
    }
  }
}
