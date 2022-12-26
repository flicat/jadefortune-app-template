import { emit, on } from '@/utils/event'

export default function initRouterEvent(router) {
  const oldGo = router.go    // 原版的router.go方法
  const oldReplace = router.replace     // 原版的router.replace方法
  let isBack = false      // 是否是返回
  let isReplace = false   // 是否是replace方法
  let historyLength = 0   // 历史栈数量

  const backFun = (index = -1) => {
    isBack = true
    // 返回方法历史栈-1
    historyLength--
    if (historyLength < 1) {
      historyLength = 1
    }
    oldGo(index)
  }

  // 接管router方法，监听前进后退
  router.go = function (index) {
    if (index < 0) {
      backFun()
    } else {
      oldGo(index)
    }
  }
  router.back = function () {
    backFun()
  }
  router.replace = function (...args) {
    isReplace = true
    oldReplace(...args)
  }

  router.beforeEach((to, from, next) => {
    if (isBack) {
      emit('history_back')
    } else {
      // 如果是页面前进且不是replace则历史栈+1
      if (!isReplace) {
        historyLength++
      }
      emit('history_go')
    }
    next()
  })

  router.afterEach((to, from) => {
    // 重置返回和replace状态
    isBack = false
    isReplace = false
  })

  // 返回事件
  on('back_event', e => {
    backFun()
    if (e.data.history === 1) {
      // 重置返回和replace状态
      isBack = false
      isReplace = false
    }
  })

  document.addEventListener('deviceready', () => {
    // 返回键事件
    document.addEventListener('backbutton', () => {
      emit('back_event', { history: historyLength })
    }, true)
  }, false)
}
