// 滚动回调方法。默认滚动到底部
// v-scroll.bottom="callback[Function]"

let scrollHandler

export default {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      return false
    }

    const eventName = binding.arg || 'bottom'
    let timer = null
    scrollHandler = e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const { scrollHeight, scrollTop, clientHeight } = e.target
        if (eventName === 'top' && scrollTop === 0) {
          binding.value.call(null, e)
        }
        if (eventName === 'bottom' && Math.abs(scrollHeight - scrollTop - clientHeight) < 5) {
          binding.value.call(null, e)
        }
      }, 100)
    }
    el.addEventListener('scroll', scrollHandler, false)
  },
  unmounted(el) {
    el.removeEventListener('scroll', scrollHandler)
  }
}
