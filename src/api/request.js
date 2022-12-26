import SITE_CONFIG from '@/config'
import { fetch as $fetch } from 'pl-mobile2'
import { ref } from 'vue'
import store from '@/store/index'
import { emit, on } from '@/utils/event'

// 请求拦截
$fetch.before(options => {
  if (!options.baseUrl) {
    options.baseUrl = SITE_CONFIG.baseUrl
  }
  options.headers = Object.assign({
    'Authorization': store.state.token,
    'DeviceType': 'mobile'
  }, options.headers)
})

// 响应拦截
$fetch.after(res => {
  return res.catch(async response => {
    if (response.status === 401) {
      // 退出登陆
      emit('logout')
    }

    // 返回错误信息
    let data

    try {
      data = await response.json()
    } catch (e) {
      console.error(e)
    }

    if (data && data.result) {
      try {
        const result = JSON.parse(data.result)
        if (result && result.msg) {
          return Promise.reject({ message: result.msg })
        }
      } catch (e) {
        console.error(e)
      }
    }

    if (data && data.msg) {
      return Promise.reject({ message: data.msg })
    }

    return Promise.reject({ message: response.statusText || '网络错误' })
  })
})

// 页面离开中断请求
const abortControllerSet = new Set()
on('pageChange', () => {
  Array.from(abortControllerSet).forEach(controller => {
    controller.abort()
  })
  abortControllerSet.clear()
})

export default function request(options) {
  const loading = ref(true)
  const request = $fetch.options(options)
  return [
    function (options) {
      const controller = new AbortController()
      abortControllerSet.add(controller)

      return request.request(Object.assign({
        signal: controller.signal
      }, options)).finally(() => {
        loading.value = false
        abortControllerSet.delete(controller)
      })
    },
    loading,
    request.url.bind(request),
    request.headers.bind(request)
  ]
}
